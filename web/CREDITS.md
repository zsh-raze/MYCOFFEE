# Credits & Licenses

## Assets
Only client-provided assets are used. Images in `public/images/` are copies of the client files in
`../assets/images/`. List here every file that is NOT a byte-identical copy (trimmed, resized, converted,
background-removed) and why:

All 12 files were supplied by the client team on 10 Oct 2026: AI-generated **concept** images made
from the prompts in plan.md §11–§12. They are conceptual editorial imagery, not photos of real
products, suppliers or people, and are pending Mr. Lim's approval. Originals (unchanged) are in
`../assets/images/{category}/`. Every file in `public/images/` is a derived export, made with sharp:

| Site file (`public/images/…`) | Original (`../assets/images/…`) | Change |
|---|---|---|
| `brand/mycoffee_logo_concept_v01.png` | `brand/mycoffee-sg-logo-concept-wordmark.png` | transparent margin trimmed (1400×400 → 733×119) |
| `home/mycoffee_home_hero_desktop_v01.webp` | `home/coffee-home-hero-desktop.png` | resized 2880→2400 px wide, WebP q80 (5.1 MB → 165 KB) |
| `home/mycoffee_home_hero_mobile_v01.webp` | `home/coffee-home-hero-mobile.png` | WebP q80, same size (2.2 MB → 93 KB) |
| `home/mycoffee_home_build_v01.webp` | `home/brewing-methods-flatlay.png` | resized to 1500 px, WebP q80 |
| `categories/mycoffee_category_beans_v01.webp` | `categories/coffee-beans-category.png` | resized to 960 px, WebP q80 |
| `categories/mycoffee_category_ground_v01.webp` | `categories/ground-coffee-category.png` | resized to 960 px, WebP q80 |
| `categories/mycoffee_category_prepared_v01.webp` | `categories/prepared-coffee-category.png` | resized to 960 px, WebP q80 |
| `categories/mycoffee_category_accessories_v01.webp` | `categories/brewing-accessories-category.png` | resized to 960 px, WebP q80 |
| `categories/mycoffee_category_gifts_v01.webp` | `categories/discovery-gift-set-category.png` | resized to 960 px, WebP q80 |
| `about/mycoffee_about_barista_v01.webp` | `about/barista-pourover-about.png` | WebP q80, same size |
| `roasters/mycoffee_roasters_cupping_v01.webp` | `roasters/cupping-table-roasters-header.png` | resized 2880→2400 px wide, WebP q80 |
| `build/mycoffee_build_espresso_v01.webp` | `build/espresso-cup-build-your-coffee.png` | resized to 1500 px, WebP q80 |

`brand/mycoffee-sg-logo-concept-wordmark.svg` is kept in assets but not used. It draws the name
with live `<text>` in Baskerville/Georgia, so it renders in whatever font the viewer's device has.
A designer should convert the text to outlines before it becomes the master file.

## Fonts
System fonts only (nothing downloaded or bundled).

## Code libraries
- sharp (image export only, via Next.js) — Apache 2.0
- Next.js, React — MIT
- Tailwind CSS — MIT
- Playwright (testing only, not shipped) — Apache 2.0

## Tracking
None. No analytics, tracking pixels, third-party scripts, embeds or external requests.
