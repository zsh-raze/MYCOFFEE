// Image paths and structured data. Originals (client-team AI concepts, generated from plan.md §11
// and §12) live in ../assets/images/{category}/; the files here are WebP exports of them
// (see CREDITS.md). All are conceptual editorial imagery pending Mr. Lim's approval.
const I = "/images";
export const IMG = {
  logo: `${I}/brand/mycoffee_logo_concept_v01.png`, // wordmark concept — trimmed from the client PNG
  heroDesktop: `${I}/home/mycoffee_home_hero_desktop_v01.webp`, // #1 subject right, calm left
  heroMobile: `${I}/home/mycoffee_home_hero_mobile_v01.webp`, // #2 subject lower half, calm top
  build: `${I}/home/mycoffee_home_build_v01.webp`, // #8 brewing methods flat lay
  about: `${I}/about/mycoffee_about_barista_v01.webp`, // #9 barista pour-over, hands only
  roasters: `${I}/roasters/mycoffee_roasters_cupping_v01.webp`, // #10 cupping table, calm left
  buildHeader: `${I}/build/mycoffee_build_espresso_v01.webp`, // #11 espresso cup, calm left
  // #3–#7, in the same order as home.explore.items in content/en.ts
  categories: [
    `${I}/categories/mycoffee_category_beans_v01.webp`,
    `${I}/categories/mycoffee_category_ground_v01.webp`,
    `${I}/categories/mycoffee_category_prepared_v01.webp`,
    `${I}/categories/mycoffee_category_accessories_v01.webp`,
    `${I}/categories/mycoffee_category_gifts_v01.webp`,
  ],
} as const;

// Intrinsic size of the logo file (next/image reserves space with it).
export const LOGO_SIZE = { width: 733, height: 119 };

// Build Your Coffee options — controlled vocabularies taken word-for-word from the brief.
// Each value is also the label shown on the site; edit both here and nowhere else.
export const OPTIONS = {
  format: ["Whole beans", "Ground coffee", "Drip bags", "Capsules"], // [Brief §5.2 step 1, §5.2 step 5]
  flavor: ["Chocolatey", "Nutty", "Fruity", "Floral", "Caramel-like", "Balanced", "Bold"], // [Brief §5.2 step 2]
  roast: ["Light", "Medium", "Medium-dark", "Dark"], // [Brief §5.2 step 3]
  brew: ["Espresso", "Moka pot", "French press", "Pour-over", "AeroPress", "Drip machine", "Cold brew"], // [Brief §5.2 step 4]
  grind: ["Coarse", "Medium", "Fine", "Espresso", "Brewer-specific grind"], // [Brief §4.1 Ground coffee]
} as const;

// Format that unlocks the grind step (brief §5.5: only show options that apply).
export const GROUND_FORMAT = "Ground coffee";
