"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Band, Logo, type Tone } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { MOBILE_BAR, NAV_ROUTES, SITE, whatsappLink } from "@/lib/site";

/**
 * Floating bottom bar on mobile: up to three links from MOBILE_BAR + WhatsApp, in a rounded pill
 * inset from the screen edges. Solid background (blur leaves smudges). The current page gets a
 * tinted pill and aria-current, so the state isn't shown by colour alone.
 */
export function MobileBar() {
  const { t } = useLang();
  const pathname = usePathname();

  // Slightly smaller labels below 380px so all four items fit on a 320px phone.
  const item =
    "flex h-11 min-w-0 flex-1 items-center justify-center rounded-full px-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 min-[380px]:text-sm";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 md:hidden"
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1.5 shadow-[0_12px_32px_-12px_rgba(41,37,33,0.35)]">
        {MOBILE_BAR.map((m) => {
          const active = isActive(m.href);
          return (
            <Link
              key={m.href}
              href={m.href}
              aria-current={active ? "page" : undefined}
              className={`${item} ${active ? "bg-accent-soft font-semibold text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {t.mobileBar[m.key]}
            </Link>
          );
        })}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} flex-[1.25] bg-ink font-semibold text-paper hover:bg-accent-strong`}
        >
          {t.mobileBar.whatsapp}
        </a>
      </div>
    </nav>
  );
}

// Tone of the LAST band on each page, so the footer blends in from it. Pages not listed use "paper".
// Rule: a page's last Band sets next="footer", and its tone is listed here. Update both together.
const LAST_BAND: Record<string, Tone> = {
  "/": "accent-soft",
  "/build": "paper",
  "/about": "tint-1",
  "/roasters": "paper",
  "/contact": "paper",
};

export function SiteFooter() {
  const { t } = useLang();
  const pathname = usePathname();
  return (
    <Band as="footer" tone="footer" prev={LAST_BAND[pathname] ?? "paper"} className="pt-20 pb-24 text-ink md:pt-24 md:pb-12">
      <div className="container-k">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="h-8 md:h-9" />
            <p className="mt-3 text-ink-soft">{t.footer.tagline}</p>
          </div>
          <div className="md:col-span-3">
            <p className="t-caption mb-4 text-ink-soft">{t.footer.pages}</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {NAV_ROUTES.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-ink transition-opacity duration-200 hover:opacity-70">
                    {t.nav[r.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="t-caption mb-4 text-ink-soft">{t.footer.contact}</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-serif)] text-xl transition-opacity duration-200 hover:opacity-70"
            >
              WhatsApp · {SITE.whatsappDisplay}
            </a>
          </div>
        </div>
        <div className="mt-14 border-t border-ink/15 pt-6 text-xs text-ink-soft">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </Band>
  );
}
