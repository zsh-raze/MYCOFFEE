import { expect, test, type Page } from "@playwright/test";
import { DICTS, LANG_LABELS } from "../src/content";
import { NAV_ROUTES, SITE } from "../src/lib/site";

// QA suite for the client approval checklist:
//  - every page loads: one h1, no console errors, no horizontal scroll, no broken images / missing alt
//  - no leftover template text (incl. any "TODO" placeholder) in any language
//  - every internal link resolves; every WhatsApp link uses the configured number
//  - only local (client) assets load, no external requests (no tracking)
//  - mobile menu, bottom bar, language toggle, inquiry form, 404
// Add a test for every interactive feature you build (carousel, filters, tabs, lightbox…).

const PAGES = NAV_ROUTES.map((r) => r.href);
const WA = `https://wa.me/${SITE.whatsappNumber}`;
const BANNED = /lorem|ipsum|\btodo\b|placeholder|get started by editing|vercel|next\.js|BRAND NAME/i;
const LANGS = Object.keys(DICTS) as (keyof typeof DICTS)[];

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

// Instant scrolling: the site uses smooth scroll, which would otherwise stall reveal animations.
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
  });
}

for (const path of PAGES) {
  test(`page ${path} renders cleanly`, async ({ page }) => {
    const errors = await collectErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();

    await scrollThrough(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const broken = await page.$$eval("img", (imgs) =>
      imgs.filter((i) => !i.hasAttribute("alt") || (i.complete && i.naturalWidth === 0)).map((i) => i.src),
    );
    expect(broken).toEqual([]);
    expect(await page.locator("body").innerText()).not.toMatch(BANNED);
    expect(errors).toEqual([]);
  });

  test(`page ${path} links all resolve`, async ({ page, request }) => {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    for (const href of new Set(hrefs)) {
      if (href.startsWith("/")) {
        expect((await request.get(href)).status(), href).toBe(200);
      } else if (href.includes("wa.me")) {
        expect(href.startsWith(WA), href).toBe(true);
      } else if (href.startsWith("#")) {
        await expect(page.locator(href), `anchor ${href}`).toHaveCount(1);
      } else {
        expect(href, "unexpected link").toBe("#main");
      }
    }
    const unsafe = await page.$$eval('a[target="_blank"]', (as) => as.filter((a) => !a.getAttribute("rel")?.includes("noopener")).length);
    expect(unsafe).toBe(0);
  });
}

test("every language renders without leftover template text", async ({ page }) => {
  test.skip(LANGS.length < 2, "single-language site");
  await page.goto("/");
  for (const lang of LANGS) {
    await page.getByRole("button", { name: LANG_LABELS[lang], exact: true }).first().click();
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    for (const path of PAGES) {
      await page.goto(path);
      await scrollThrough(page);
      expect(await page.locator("body").innerText(), `${lang} ${path}`).not.toMatch(BANNED);
    }
    await page.goto("/");
  }
});

test("inquiry form validates and opens WhatsApp", async ({ page, context }) => {
  await page.goto("/contact");
  const form = page.locator("form");
  await form.getByRole("button").click();
  await expect(page.locator("#err-name")).toBeVisible();
  await expect(page.locator("#err-message")).toBeVisible();

  await page.locator('input[name="name"]').fill("Test Partner");
  await page.locator('textarea[name="message"]').fill("Hello");
  await context.route("https://wa.me/**", (r) => r.fulfill({ status: 200, body: "ok" }));
  const popupPromise = context.waitForEvent("page");
  await form.getByRole("button").click();
  const popup = await popupPromise;
  expect(popup.url().startsWith(WA)).toBe(true);
  expect(decodeURIComponent(popup.url())).toContain("Test Partner");
});

test("mobile menu and bottom bar navigate", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: DICTS.en.nav.menu }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const target = NAV_ROUTES[NAV_ROUTES.length - 1];
  await dialog.getByRole("link", { name: DICTS.en.nav[target.key], exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${target.href}$`));
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("navigation", { name: "Quick actions" })).toBeVisible();
});

test("only local assets are loaded (no external requests)", async ({ page }) => {
  const external: string[] = [];
  const assets: string[] = [];
  page.on("request", (r) => {
    if (new URL(r.url()).hostname !== "localhost") external.push(r.url());
    if (["image", "media", "font"].includes(r.resourceType())) assets.push(decodeURIComponent(new URL(r.url()).pathname));
  });
  for (const path of PAGES) {
    await page.goto(path, { waitUntil: "networkidle" });
    await scrollThrough(page);
  }
  expect(external).toEqual([]);
  for (const a of assets) expect(a, a).toMatch(/^\/images\//);
});

test("404 page links home", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await page.getByRole("link", { name: DICTS.en.notFound.back, exact: true }).last().click();
  await expect(page).toHaveURL(/\/$/);
});

test("Build Your Coffee: steps, conditional grind, skip, review and WhatsApp summary", async ({ page }) => {
  const b = DICTS.en.build;
  await page.goto("/build");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  const card = page.locator('section[aria-labelledby="step-question"]');
  const next = card.getByRole("button", { name: b.next, exact: true });

  // Step 1 — single choice; choosing Ground coffee adds the grind step (7 steps instead of 6).
  await expect(page.getByText("Step 1 of 6")).toBeVisible();
  await card.getByRole("button", { name: "Ground coffee" }).click();
  await expect(card.getByRole("button", { name: "Ground coffee" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Step 1 of 7")).toBeVisible();
  await next.click();

  // Step 2 — multi choice
  await expect(page.locator("#step-question")).toHaveText(b.steps.flavor.question);
  await expect(page.locator("#step-question")).toBeFocused();
  await card.getByRole("button", { name: "Fruity" }).click();
  await card.getByRole("button", { name: "Floral" }).click();
  await next.click();

  // Step 3 — skip
  await card.getByRole("button", { name: b.skip }).click();
  // Step 4 — brew
  await card.getByRole("button", { name: "Pour-over" }).click();
  await next.click();
  // Step 5 — grind (only because Ground coffee)
  await expect(page.locator("#step-question")).toHaveText(b.steps.grind.question);
  await card.getByRole("button", { name: "Medium", exact: true }).click();
  await next.click();
  // Step 6 — budget
  await card.getByRole("textbox").fill("SGD 30");
  await next.click();

  // Review
  await expect(page.locator("#step-question")).toHaveText(b.steps.review.question);
  const summary = card.locator("dl");
  await expect(summary).toContainText("Ground coffee");
  await expect(summary).toContainText("Fruity, Floral");
  await expect(summary).toContainText(b.notSure);
  const href = await card.getByRole("link", { name: b.send }).getAttribute("href");
  expect(href!.startsWith(WA)).toBe(true);
  const text = decodeURIComponent(href!);
  for (const s of ["Ground coffee", "Fruity, Floral", "Pour-over", "Medium", "SGD 30", `Roast preference: ${b.notSure}`]) expect(text).toContain(s);

  // Choices survive a reload (saved on this device)
  await page.reload();
  await card.getByRole("button", { name: "Ground coffee" }).waitFor();
  await expect(card.getByRole("button", { name: "Ground coffee" })).toHaveAttribute("aria-pressed", "true");

  // Switching away from ground coffee removes the grind step again
  await card.getByRole("button", { name: "Whole beans" }).click();
  await expect(page.getByText("Step 1 of 6")).toBeVisible();
});

test("homepage flavor chip opens Build Your Coffee with the flavor preselected", async ({ page }) => {
  await page.goto("/build");
  await page.evaluate(() => localStorage.clear());
  await page.goto("/");
  await page.getByRole("link", { name: "Nutty", exact: true }).click();
  await expect(page).toHaveURL(/\/build\?flavor=Nutty$/);
  const card = page.locator('section[aria-labelledby="step-question"]');
  await card.getByRole("button", { name: DICTS.en.build.next, exact: true }).click();
  await expect(card.getByRole("button", { name: "Nutty" })).toHaveAttribute("aria-pressed", "true");
});

test("homepage category links pre-fill WhatsApp", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("#explore a[href*='wa.me']");
  await expect(links).toHaveCount(DICTS.en.home.explore.items.length);
  expect(decodeURIComponent((await links.first().getAttribute("href"))!)).toContain(DICTS.en.home.explore.items[0].name);
});

test("roaster application validates and opens WhatsApp", async ({ page, context }) => {
  const f = DICTS.en.roasters.form;
  await page.goto("/roasters");
  const form = page.locator("form");
  await form.getByRole("button", { name: f.submit }).click();
  await expect(page.locator("#err-business")).toHaveText(f.errorBusiness);
  await expect(page.locator("#err-name")).toBeVisible();
  await expect(page.locator("#err-products")).toBeVisible();
  await expect(page.locator('input[name="business"]')).toBeFocused();

  await page.locator('input[name="business"]').fill("Test Roastery");
  await page.locator('input[name="name"]').fill("Alex");
  await page.locator('textarea[name="products"]').fill("Single-origin beans, 250 g");
  await context.route("https://wa.me/**", (r) => r.fulfill({ status: 200, body: "ok" }));
  const popupPromise = context.waitForEvent("page");
  await form.getByRole("button", { name: f.submit }).click();
  const popup = await popupPromise;
  expect(popup.url().startsWith(WA)).toBe(true);
  expect(decodeURIComponent(popup.url())).toContain("Test Roastery");
});
