// Image paths and structured data. Every image must be a client-provided (or client-approved) file:
// originals live in ../assets/images/{category}/ and are copied into public/images/{category}/.
//
// No images have been supplied yet (see plan.md §9 and §11 for the AI image briefs awaiting
// approval), so the site is typography-led. Add entries here once files are approved.
export const IMG = {} as const;

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
