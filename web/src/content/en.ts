// ALL English site text lives in this file — one place for Mr. Lim to review every word.
// Tag each line with its source:
//   [Brief §n] = MYCOFFEE PROPOSAL.pdf section ("adapted" = reworded from internal "should" voice
//                to customer voice, or shortened — meaning unchanged; flagged for sign-off)
//   [UI]       = functional label (button, form, aria) — listed for client approval
// Build Your Coffee option labels live in src/data/catalog.ts (OPTIONS), also from the brief.

export const en = {
  meta: {
    title: "Mycoffee.sg", // [Brief cover]
    description:
      "A coffee discovery and personalization platform that brings a wide range of coffee products and suppliers into one easy-to-explore experience.", // [Brief §2.2 positioning, shortened]
  },

  nav: {
    home: "Home", // [UI]
    build: "Build Your Coffee", // [Brief §6.1]
    about: "About", // [Brief §6.1]
    roasters: "For Roasters", // [UI] — supplier application, brief §6.5
    contact: "Contact", // [UI]
    menu: "Menu", // [UI]
    close: "Close", // [UI]
    language: "Language", // [UI]
    whatsapp: "WhatsApp Us", // [UI]
    skip: "Skip to content", // [UI]
  },

  mobileBar: {
    home: "Home", // [UI]
    build: "Build", // [UI] short form of "Build Your Coffee"
    about: "About", // [UI]
    whatsapp: "WhatsApp", // [UI]
  },

  home: {
    hero: {
      eyebrow: "Coffee discovery & personalization", // [Brief cover subtitle]
      title: "Coffee is personal.", // [Brief cover "Core idea"]
      lead: "Discover coffee, understand your preferences, and choose from options that suppliers can genuinely fulfill.", // [Brief cover, adapted]
      primaryCta: "Build Your Coffee", // [Brief §6.2]
      secondaryCta: "Explore coffee", // [Brief §2.3 "Explore coffee by category…"]
      quizLabel: "What kind of coffee experience do you enjoy?", // [Brief §5.3]
      quizHint: "Pick a flavor to start — or skip the quiz and browse.", // [UI] (§5.3 "let users skip the quiz")
      imageAlt: "A stoneware cup of black coffee beside a pour-over brewer and scattered coffee beans on a linen table", // [UI]
    },
    statement: {
      eyebrow: "Brand philosophy", // [Brief §2.1]
      title: "People differ in taste, budget, daily routine, brewing equipment, and curiosity.", // [Brief §2.1]
      body: "Mycoffee.sg makes the world of coffee easier to explore while giving you the freedom to choose what suits you — welcoming to beginners without feeling simplistic to enthusiasts.", // [Brief §2.1, adapted]
      asideLabel: "Our promise", // [Brief §2.2 "Brand promise"]
      aside: "Better-informed choices, more relevant recommendations, and a simpler path from curiosity to a coffee that suits you.", // [Brief §2.2, adapted]
    },
    explore: {
      eyebrow: "Ways to explore", // [Brief §6.2 "popular ways to explore"]
      title: "Explore coffee by category, origin, roast, flavor, and brewing method.", // [Brief §2.3 Discover]
      ask: "Ask on WhatsApp", // [UI]
      askMessage: "Hello Mycoffee.sg, I'd like to explore: ", // [UI]
      // [Brief §4.1 Product categories — "Examples" column]. ⚠️ Launch categories to be confirmed (plan.md A8).
      items: [
        { name: "Coffee beans", alt: "Close-up of roasted whole coffee beans", examples: "Arabica, Robusta, Liberica, Excelsa; single-origin; blends; decaf" },
        { name: "Ground coffee", alt: "Coarse, medium and fine ground coffee side by side with a brass scoop", examples: "Coarse, medium, fine, espresso or brewer-specific grind" },
        { name: "Prepared coffee", alt: "A glass of iced cold brew next to a plain drip-bag sachet", examples: "Cold brew, concentrate, bottled coffee, instant, capsules, drip bags" },
        { name: "Coffee accessories", alt: "A hand grinder, gooseneck kettle, scale and paper filters", examples: "Brewers, filters, grinders, scales, cups" },
        { name: "Gifts and discovery sets", alt: "An open gift box holding three plain coffee pouches", examples: "Tasting boxes, gift bundles, multi-origin sets" },
      ],
    },
    how: {
      eyebrow: "Build Your Coffee", // [Brief §5]
      title: "Coffee selection as a guided, transparent process.", // [Brief §5.1, adapted]
      body: "Easy for a beginner and precise enough for an experienced buyer. You only see choices that are genuinely available.", // [Brief §5.1 + §2.3 Customize, adapted]
      cta: "Start building", // [UI]
      imageAlt: "Overhead view of an espresso, a moka pot, a pour-over brewer and a bowl of coffee beans", // [UI]
      // [Brief §5.2 Recommended flow — step names + customer actions]
      steps: [
        { name: "Coffee type", text: "Select beans, ground coffee, drip bags, capsules, or another available format." },
        { name: "Flavor preference", text: "Choose tags such as chocolatey, nutty, fruity, floral, caramel-like, balanced, or bold." },
        { name: "Roast preference", text: "Select light, medium, medium-dark, or dark." },
        { name: "Brewing method", text: "Select espresso, moka pot, French press, pour-over, AeroPress, drip machine, or cold brew." },
        { name: "Format and grind", text: "Choose whole beans or available ground options." },
        { name: "Budget", text: "Set a maximum or preferred range." },
      ],
    },
    pillars: {
      eyebrow: "Brand pillars", // [Brief §2.3]
      title: "Discover. Customize. Learn. Trust. Enjoy.", // [Brief §2.3 pillar names]
      // [Brief §2.3 "Meaning in the customer experience"]
      items: [
        { name: "Discover", text: "Explore coffee by category, origin, roast, flavor, and brewing method." },
        { name: "Customize", text: "Choose from options that are genuinely available for a product." },
        { name: "Learn", text: "Understand coffee terms without needing prior expertise." },
        { name: "Trust", text: "Know what is being purchased and who supplies it." },
        { name: "Enjoy", text: "Make repeat discovery and reordering easy." },
      ],
    },
    question: {
      eyebrow: "What makes us different", // [Brief §2.5 "Brand differentiation"]
      lead: "We help you answer", // [Brief §2.5, adapted]
      ask: "“Which coffee is right for me?”", // [Brief §2.5]
      rather: "rather than only “Which coffee can I buy?”", // [Brief §2.5]
      body: "Useful discovery, transparent product information, conditional customization, and approachable coffee education.", // [Brief §2.5]
    },
    roasters: {
      eyebrow: "For roasters & suppliers", // [UI]
      title: "Independent roasters, producers, specialty brands, and other qualified sellers.", // [Brief §1]
      body: "Mycoffee.sg brings a wide range of coffee products and suppliers into one easy-to-explore experience.", // [Brief §2.2 positioning, adapted]
      cta: "How to join", // [UI]
    },
  },

  build: {
    eyebrow: "Guided preferences", // [Brief §6.1 Build Your Coffee purpose]
    title: "Build Your Coffee", // [Brief §5]
    lead: "A short, optional quiz in plain language. Skip any question you’re not sure about.", // [Brief §5.3, adapted]
    imageAlt: "", // decorative header photo (espresso cup)
    progress: "Step {n} of {total}", // [UI]
    back: "Back", // [UI]
    next: "Next", // [UI]
    skip: "Not sure — skip", // [UI]
    startOver: "Start over", // [UI]
    edit: "Edit", // [UI]
    multiHint: "Choose as many as you like.", // [UI]
    notSure: "Not sure", // [UI] summary value for skipped steps
    steps: {
      format: {
        label: "Coffee type", // [Brief §5.2 step 1]
        question: "Which format would you like?", // [UI]
        note: "Select beans, ground coffee, drip bags, capsules, or another available format.", // [Brief §5.2 step 1]
      },
      flavor: {
        label: "Flavor preference", // [Brief §5.2 step 2]
        question: "What kind of coffee experience do you enjoy?", // [Brief §5.3]
        note: "Tasting notes are descriptive — not everyone tastes the same notes.", // [Brief §2.4 + §5.2, adapted]
      },
      roast: {
        label: "Roast preference", // [Brief §5.2 step 3]
        question: "How do you like it roasted?", // [UI]
        note: "Roast level is not a direct measure of caffeine.", // [Brief §5.2, adapted]
      },
      brew: {
        label: "Brewing method", // [Brief §5.2 step 4]
        question: "How do you brew at home?", // [UI]
        note: "Used to prioritize coffees suited to your brewer.", // [Brief §5.2 step 4 system behavior, adapted]
      },
      grind: {
        label: "Format and grind", // [Brief §5.2 step 5]
        question: "Which grind do you need?", // [UI]
        note: "Grind options depend on what each seller actually provides.", // [Brief §4.1 + §5.5, adapted]
      },
      budget: {
        label: "Budget", // [Brief §5.2 step 7]
        question: "Do you have a budget in mind?", // [UI]
        note: "Set a maximum or preferred range.", // [Brief §5.2 step 7]
        placeholder: "e.g. per bag or per month", // [UI]
        field: "Preferred budget (optional)", // [UI]
      },
      review: {
        label: "Review", // [Brief §5.2 step 9]
        question: "Your coffee profile", // [UI]
        note: "Send it to us on WhatsApp — recommendations explain why each coffee matches your choices.", // [Brief §5.4, adapted] ⚠️ service promise: confirm with Mr. Lim
      },
    },
    send: "Send my profile on WhatsApp", // [UI]
    waIntro: "Hello Mycoffee.sg, here is my coffee profile:", // [UI]
    waOutro: "Please suggest coffees that match.", // [UI]
    saved: "Your choices are saved on this device.", // [UI] (§5.7 "return without losing choices")
  },

  about: {
    eyebrow: "About", // [UI]
    title: "A coffee discovery and personalization platform", // [Brief §2.2]
    lead: "Bringing a wide range of coffee products and suppliers into one easy-to-explore experience, helping you find coffee that fits your preferences and brewing habits.", // [Brief §2.2 positioning, adapted]
    // [Brief §2.2]
    trio: [
      { label: "Mission", text: "Make coffee discovery clearer, more personal, and more accessible by connecting useful product information with intuitive selection tools." },
      { label: "Vision", text: "Become a trusted digital destination where people can explore coffee from different origins and producers, learn what they enjoy, and build a coffee routine that feels their own." },
      { label: "Promise", text: "Better-informed choices, more relevant recommendations, and a simpler path from curiosity to a coffee that suits you." },
    ],
    philosophy: {
      imageAlt: "Hands pouring water from a gooseneck kettle into a pour-over brewer", // [UI]
      eyebrow: "Brand philosophy", // [Brief §2.1]
      title: "Coffee is personal.", // [Brief §2.1]
      body: "People differ in taste, budget, daily routine, brewing equipment, and curiosity. Mycoffee.sg makes the world of coffee easier to explore while giving you the freedom to choose what suits you. The experience is welcoming to beginners without feeling simplistic to enthusiasts.", // [Brief §2.1, adapted]
    },
    trust: {
      eyebrow: "How we work", // [UI]
      title: "Attractive design never comes at the expense of product accuracy.", // [Brief §1 "Non-negotiable principle", adapted]
      // [Brief §1, §2.4, §4.2, §5.5 — adapted to customer voice]
      items: [
        { name: "Real product information", text: "Actual product imagery and verified seller information take priority on purchase pages." },
        { name: "Nothing invented", text: "If information is unknown, we omit it or label it “Not specified” — never a guessed farm, region, variety, roast date or certification." },
        { name: "Only real options", text: "A product never shows a grind or option its seller does not provide." },
        { name: "Honest descriptions", text: "Clear, warm language. Technical terms explained briefly. Sensory but honest — we never promise everyone will taste the same notes." },
      ],
    },
    cta: "Build Your Coffee", // [Brief §6.2]
  },

  roasters: {
    eyebrow: "For roasters & suppliers", // [UI]
    title: "Join Mycoffee.sg", // [UI]
    imageAlt: "", // decorative header photo (cupping table)
    lead: "Mycoffee.sg brings coffee from independent roasters, producers, specialty brands, and other qualified sellers into one easy-to-explore experience.", // [Brief §1 + §2.2, adapted] ⚠️ confirm supplier recruitment is part of launch (plan.md A9)
    ask: {
      eyebrow: "What we ask for", // [UI]
      title: "Accurate information, real photos, clear responsibilities.", // [UI] summarising §4.3–4.4
      // [Brief §4.4 Seller onboarding checklist + §4.3, adapted]
      items: [
        "Business and contact details",
        "Product list with SKU or internal product ID",
        "Pricing, pack size, inventory process, lead time, and fulfillment location",
        "Returns, refunds, damaged-item process, and customer-service responsibility",
        "Original, current product photos — with image and intellectual-property permissions",
        "Supporting evidence for certifications, product claims, and origin statements",
      ],
    },
    steps: {
      eyebrow: "How review works", // [UI]
      title: "From application to publication", // [UI]
      // [Brief §7 Journey E flow + §3.2 catalog approval, adapted]
      items: [
        { name: "Review requirements", text: "Check what information, images and fulfillment details we need." },
        { name: "Submit application", text: "Send your details below — we ask only for what is needed to evaluate it." },
        { name: "Receive confirmation", text: "We confirm that your application has arrived." },
        { name: "Onboarding review", text: "We review product descriptions, origin, roast, processing method, pricing, images, packaging, and available customizations before publication." },
      ],
      note: "Submitting an application does not guarantee acceptance.", // [Brief §6.5]
    },
    form: {
      title: "Apply on WhatsApp", // [UI]
      business: "Business name", // [UI]
      name: "Contact name", // [UI]
      location: "Fulfillment location", // [UI] (§4.4)
      products: "What do you sell?", // [UI]
      productsHint: "Coffee types, formats, pack sizes", // [UI]
      submit: "Send application via WhatsApp", // [UI]
      required: "Required", // [UI]
      errorBusiness: "Please enter your business name.", // [UI]
      errorName: "Please enter a contact name.", // [UI]
      errorProducts: "Please tell us what you sell.", // [UI]
      sent: "WhatsApp opened in a new tab with your application.", // [UI]
      waIntro: "Hello Mycoffee.sg, supplier application:", // [UI]
      privacy: "Your details are sent to us through WhatsApp only.", // [UI] ⚠️ full privacy notice needed (brief §6.5)
    },
  },

  contact: {
    eyebrow: "Contact", // [UI]
    title: "Questions about coffee?", // [UI]
    lead: "Ask us anything — which coffee suits your brewer, what a term means, or how to get started.", // [UI] (§2.3 Learn) ⚠️ confirm with Mr. Lim
    formTitle: "Message us on WhatsApp", // [UI]
    form: {
      name: "Name", // [UI]
      message: "Message", // [UI]
      submit: "Send via WhatsApp", // [UI]
      required: "Required", // [UI]
      errorName: "Please enter your name.", // [UI]
      errorMessage: "Please enter a message.", // [UI]
      sent: "WhatsApp opened in a new tab with your message.", // [UI]
      waIntro: "Hello Mycoffee.sg, inquiry from the website:", // [UI]
    },
  },

  notFound: {
    title: "Page not found", // [UI]
    back: "Home", // [UI]
  },

  footer: {
    tagline: "Coffee is personal.", // [Brief cover]
    contact: "Contact", // [UI]
    pages: "Pages", // [UI]
    copyright: "© 2026 Mycoffee.sg", // [UI]
  },
};

export type Content = typeof en;
