# Mycoffee.sg — Website prototype

Brand site built from the client brief and assets. Next.js (App Router) · TypeScript · Tailwind CSS 4.
No backend, CMS or tracking — every CTA opens WhatsApp.

## Run it

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build && npm start  # production build
```

## Pages

| Route | Content |
|---|---|
| `/` | Hero + flavor quiz entry, philosophy, ways to explore, how Build Your Coffee works, pillars, differentiation, roaster CTA |
| `/build` | Build Your Coffee step flow → profile sent on WhatsApp |
| `/about` | Mission, vision, promise, philosophy, how we work |
| `/roasters` | Supplier requirements, review steps, application form (WhatsApp) |
| `/contact` | WhatsApp inquiry form |

## Editing content

| What | Where |
|---|---|
| All text (with source tags) | `src/content/en.ts` (+ other language files in `src/content/`) |
| Languages offered | `src/content/index.ts` |
| Build Your Coffee options, image paths | `src/data/catalog.ts` |
| Brand name, domain, WhatsApp number, routes, mobile bar | `src/lib/site.ts` |
| Colours, type, motion | `src/app/globals.css` |

Original client images live in `../assets/images/{category}/`; copies used by the site are in `public/images/`.

## Testing

```bash
npx playwright install chromium   # first time only
NEXT_DIST_DIR=.next-qa npm run build
npm test                          # desktop 1440, tablet 820, mobile (Pixel 7)
```

`NEXT_DIST_DIR=.next-qa` keeps test builds out of `.next`, so they never clash with a running `npm run dev`.

## Credits
See `CREDITS.md`.
