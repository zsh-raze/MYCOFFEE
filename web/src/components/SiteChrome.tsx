"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Band, Logo, type Tone } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { MOBILE_BAR, NAV_ROUTES, SITE, whatsappLink } from "@/lib/site";

/** Fixed bottom app bar on mobile: up to three links from MOBILE_BAR + WhatsApp. Solid background (no blur smudges). */
export function MobileBar() {
  const { t } = useLang();
  const pathname = usePathname();

  // Small, tight labels below 380px so four cells fit on a 320px phone.
  const item =
    "flex min-w-0 flex-1 items-center justify-center px-1 text-[11px] font-bold uppercase tracking-[0.04em] whitespace-nowrap transition-colors duration-200 min-[380px]:text-xs min-[380px]:tracking-[0.08em]";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex h-14 divide-x divide-line">
        {MOBILE_BAR.map((m) => (
          <Link key={m.href} href={m.href} className={`${item} ${isActive(m.href) ? "text-accent-strong" : "text-ink"}`}>
            {t.mobileBar[m.key]}
          </Link>
        ))}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${item} bg-accent-strong text-white`}>
          {t.mobileBar.whatsapp}
        </a>
      </div>
    </nav>
  );
}

// Tone of the LAST band on each page, so the footer blends in from it. Pages not listed use "paper".
// Rule: a page's last Band sets next="dark", and its tone is listed here. Update both together.
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
    <Band as="footer" tone="dark" prev={LAST_BAND[pathname] ?? "paper"} className="pt-20 pb-24 text-paper md:pt-24 md:pb-12">
      <div className="container-k">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="text-3xl text-paper [&>span]:text-accent" />
            <p className="mt-3 text-paper/70">{t.footer.tagline}</p>
          </div>
          <div className="md:col-span-3">
            <p className="t-caption mb-4 text-paper/60">{t.footer.pages}</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {NAV_ROUTES.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-paper/90 transition-opacity duration-200 hover:opacity-70">
                    {t.nav[r.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="t-caption mb-4 text-paper/60">{t.footer.contact}</p>
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
        <div className="mt-14 border-t border-paper/15 pt-6 text-xs text-paper/60">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </Band>
  );
}
