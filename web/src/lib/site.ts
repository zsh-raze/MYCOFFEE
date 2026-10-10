// ── Project settings ─────────────────────────────────────────────────────────
export const SITE = {
  name: "Mycoffee.sg",
  domain: "mycoffee.sg",
  url: "https://mycoffee.sg",
  whatsappNumber: "6593752892", // digits only, with country code
  whatsappDisplay: "+65 9375 2892", // how the number is shown
};

/** WhatsApp click-to-chat link with an optional pre-filled message. All CTAs go through this. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Every page in the sitemap. `key` must exist in content `nav`.
export const NAV_ROUTES = [
  { key: "home", href: "/" },
  { key: "build", href: "/build" },
  { key: "about", href: "/about" },
  { key: "roasters", href: "/roasters" },
  { key: "contact", href: "/contact" },
] as const;

// Up to three quick links for the fixed mobile bottom bar (WhatsApp is always added last).
export const MOBILE_BAR = [
  { key: "home", href: "/" },
  { key: "build", href: "/build" },
  { key: "about", href: "/about" },
] as const;
