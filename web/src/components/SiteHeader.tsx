"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui";
import { DICTS, LANG_LABELS, type Lang } from "@/content";
import { useLang } from "@/lib/i18n";
import { NAV_ROUTES, SITE, whatsappLink } from "@/lib/site";

/** Language switch — renders nothing when the site has a single language (see src/content/index.ts). */
function LangToggle() {
  const { lang, setLang, t } = useLang();
  const options = (Object.keys(DICTS) as Lang[]).map((value) => ({ value, label: LANG_LABELS[value] }));
  if (options.length < 2) return null;
  return (
    <div role="group" aria-label={t.nav.language} className="flex rounded-full border border-ink/25 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setLang(o.value)}
          aria-pressed={lang === o.value}
          className={`min-h-9 min-w-10 rounded-full px-2.5 text-xs font-bold tracking-[0.08em] transition-colors duration-200 ${
            lang === o.value ? "bg-ink text-paper" : "text-ink hover:bg-tint-3"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the overlay on navigation; lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-paper focus:p-3">
        {t.nav.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="container-k flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label={`${SITE.name} — Home`}>
            <Logo alt="" priority className="h-6 md:h-7" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NAV_ROUTES.slice(1).map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    aria-current={isActive(r.href) ? "page" : undefined}
                    className={`border-b py-1 text-[15px] transition-colors duration-200 ${
                      isActive(r.href) ? "border-ink" : "border-transparent hover:border-ink/40"
                    }`}
                  >
                    {t.nav[r.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden !min-h-10 !px-4 !text-xs md:inline-flex"
            >
              {t.nav.whatsapp}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-ink/25 lg:hidden"
            >
              <span className="flex w-4 flex-col gap-[5px]" aria-hidden>
                <span className="h-px bg-ink" />
                <span className="h-px bg-ink" />
                <span className="h-px bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay navigation (below lg) */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-paper page-fade lg:hidden"
      >
        <div className="container-k flex h-16 items-center justify-between">
          <Logo className="h-6" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.nav.close}
            className="grid size-10 place-items-center rounded-full border border-ink/25"
          >
            <span className="relative block size-4" aria-hidden>
              <span className="absolute top-1/2 left-0 h-px w-4 rotate-45 bg-ink" />
              <span className="absolute top-1/2 left-0 h-px w-4 -rotate-45 bg-ink" />
            </span>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-k pt-6 pb-32">
          <ul className="border-t border-line">
            {NAV_ROUTES.map((r) => (
              <li key={r.href} className="border-b border-line">
                <Link
                  href={r.href}
                  aria-current={isActive(r.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-[family-name:var(--font-serif)] text-3xl"
                >
                  {t.nav[r.key]}
                  {isActive(r.href) && <span className="size-2.5 rounded-full bg-accent-strong" aria-hidden />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.nav.whatsapp}
            </a>
            {/* The overlay covers the header, so offer the language switch here too */}
            <LangToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
