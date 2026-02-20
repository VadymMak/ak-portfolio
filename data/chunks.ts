// data/chunks.ts
// Content chunks for RAG embeddings generation

export interface ContentChunk {
  id: string;
  category: string;
  content: string;
}

export const chunks: ContentChunk[] = [
  // ===== ABOUT =====
  {
    id: "about-intro",
    category: "about",
    content:
      "Anastasiia Kolisnyk is a children's book illustrator and visual designer based in Trenčín, Slovakia. She creates artwork that blends emotional clarity with thoughtful craftsmanship, bringing together illustration, storytelling, multilingual adaptation, and visual identity design.",
  },
  {
    id: "about-background",
    category: "about",
    content:
      "Anastasiia transitioned from the finance industry to illustration and design. She received over 20 job rejections before building her own successful design studio. This personal journey shapes her empathetic approach to working with clients.",
  },
  {
    id: "about-work",
    category: "about",
    content:
      "Her work spans children's books, educational materials, packaging, label design, logos, and print & digital branding. She focuses on warm color palettes, intuitive composition, and imagery that feels alive — full of rhythm, sincerity, and gentle wonder.",
  },
  {
    id: "about-tools",
    category: "about",
    content:
      "Anastasiia creates digital illustrations using Procreate on iPad and Adobe Creative Suite (Photoshop, Illustrator, InDesign). She delivers files in all required formats: CMYK 300dpi for print and RGB for digital use.",
  },

  // ===== CHILDREN'S BOOKS =====
  {
    id: "book-nutcracker",
    category: "books",
    content:
      "The Nutcracker and the Mouse King — A classic fairy tale illustrated by Anastasiia with rich Christmas atmosphere, detailed character work, and warm festive color palette. Features full-page illustrations and double-page spreads with ornate background details.",
  },
  {
    id: "book-sigurd",
    category: "books",
    content:
      "Sigurd Fights the Dragon — Illustrations for a Scandinavian mythology children's book. Features a dark, atmospheric palette with dramatic lighting. Includes full character development process from initial sketches to final artwork, with a detailed timelapse video of the creation process.",
  },
  {
    id: "book-swans",
    category: "books",
    content:
      "The Wild Swans — An illustrated adaptation of the Hans Christian Andersen fairy tale. Features an elegant watercolor-inspired digital style with soft, ethereal color palettes and emotional character expressions.",
  },
  {
    id: "book-winter",
    category: "books",
    content:
      "Winter Adventures — A children's book with cozy winter scenes. Despite the cold setting, Anastasiia created a warm color palette with golden light, soft textures, and playful compositions showing children's outdoor activities.",
  },
  {
    id: "book-magic",
    category: "books",
    content:
      "Magic World — A fantasy-themed children's book featuring imaginative creatures, vibrant colors, and playful compositions. Each illustration invites young readers into a world of wonder and imagination.",
  },
  {
    id: "book-sea",
    category: "books",
    content:
      "Secrets of the Sea for Little Explorers — An educational children's book about marine life. Features bright, detailed underwater illustrations of sea creatures, coral reefs, and ocean environments designed to be both beautiful and informative for young readers.",
  },

  // ===== DESIGN & BRANDING =====
  {
    id: "design-labels",
    category: "design",
    content:
      "Anastasiia designs product labels and packaging for food and consumer products. Her label work includes 9+ projects with thoughtful composition, harmonious palettes, and clear typography. Notable client: Star Food — complete label series plus logo and unified visual style.",
  },
  {
    id: "design-logos",
    category: "design",
    content:
      "Logo design services include distinctive marks that capture a brand's character and values. From monograms to emblems, Anastasiia creates timeless logos built with clarity and elegance. 6+ logo projects completed, including Laser Craft corporate identity.",
  },
  {
    id: "design-branding",
    category: "design",
    content:
      "Branding and print design services cover cohesive visual identity across print and digital — business cards, menus, posters, social media templates, and branded merchandise. Notable project: Baloon Party comprehensive brandbook with full visual identity development.",
  },

  // ===== CLIENTS & TESTIMONIALS =====
  {
    id: "client-starfood",
    category: "testimonials",
    content:
      "Star Food testimonial: 'Anastasia created product labels, a company logo, and a comprehensive unified visual style concept for our company. All tasks were completed precisely, systematically, and in accordance with our requirements. We collaborate on a regular basis and recommend Anastasia as a reliable partner with a professional approach.'",
  },
  {
    id: "client-baloon",
    category: "testimonials",
    content:
      "Baloon Party testimonial: 'She created a comprehensive brandbook for our company, thoroughly developing the visual identity, structure, and key elements of the corporate style. All project phases were delivered with quality, on schedule, and with attention to detail.'",
  },
  {
    id: "client-lasercraft",
    category: "testimonials",
    content:
      "Laser Craft testimonial: 'Anastasia prepared a series of graphic solutions for gift and souvenir products, including logo design and the creation of a unified corporate design concept. Her work was precise, creative, and always delivered on time. We have a long-term collaboration.'",
  },

  // ===== SERVICES =====
  {
    id: "service-book-illustration",
    category: "services",
    content:
      "Children's Book Illustration service: Full illustration sets for children's books — from initial sketches and character development to final artwork. 24–32 pages, cohesive visual storytelling. Includes concept development, mood boards, sketches, 2 revision rounds, final illustrations, and print-ready file preparation.",
  },
  {
    id: "service-cover",
    category: "services",
    content:
      "Book Cover Design service: Eye-catching cover designs that capture the essence of the story and invite readers in. Includes concept development and final print-ready artwork. Cover design is typically a separate service, additional €30–80 on top of interior illustrations.",
  },
  {
    id: "service-character",
    category: "services",
    content:
      "Character Design service: Original characters with personality and emotion — designed for books, animation, games, or branding. Includes expression sheets and style guides. Character development can take as much time as 2–3 final illustrations.",
  },
  {
    id: "service-label",
    category: "services",
    content:
      "Label & Packaging Design service: Product labels and packaging that stand out on the shelf. Thoughtful composition, harmonious palettes, and clear typography for any product category. Per-project pricing.",
  },
  {
    id: "service-logo",
    category: "services",
    content:
      "Logo Design service: Distinctive logos that capture a brand's character and values. From monograms to emblems — timeless marks built with clarity and elegance. Per-project pricing.",
  },
  {
    id: "service-branding",
    category: "services",
    content:
      "Branding & Print Design service: Cohesive visual identity across print and digital — business cards, menus, posters, social media templates, and branded merchandise.",
  },

  // ===== PRICING =====
  {
    id: "pricing-per-illustration",
    category: "pricing",
    content:
      "Per illustration pricing (2026 European market): Spot/small illustrations: $50–150 (emerging), $150–300 (mid-level), $300–500 (experienced). Full page: $75–200, $200–450, $450–1,000+. Double spread: $120–300, $300–600, $600–1,500+. Cover: $200–500, $500–1,000, $1,000–2,000+.",
  },
  {
    id: "pricing-full-book",
    category: "pricing",
    content:
      "Full children's book pricing (24–32 pages, 2026): Emerging illustrator: $2,000–$5,000. Mid-level: $3,500–$10,000. Experienced: $10,000–$18,000. Award-winning: $20,000–$30,000+. Anastasiia positions in the mid-to-experienced range.",
  },
  {
    id: "pricing-extras",
    category: "pricing",
    content:
      "Additional pricing details: 2 revision rounds included in the base price. Additional revision rounds: €10–30 per round. Cover design: additional €30–80. Rush fee for urgent projects: 20–50% surcharge. Character development adds 5–15% to total cost.",
  },
  {
    id: "pricing-budget-example",
    category: "pricing",
    content:
      "Budget calculation example for a 32-page book with 15 illustrations at mid-level: 15 illustrations × $350 = $5,250 + character development $500 + cover $600 + 15% buffer $950 = approximately $7,300 total. This is a realistic budget for a quality children's book with professional illustrations.",
  },

  // ===== PROCESS =====
  {
    id: "process-overview",
    category: "process",
    content:
      "Anastasiia's illustration process has 5 main stages: 1) Concept development with mood boards and visual style. 2) Character design with personality, proportions, expressions. 3) Rough sketches for each page — composition, text placement, poses. 4) Final full-color high-resolution illustrations. 5) File preparation in CMYK 300dpi for print and RGB for digital.",
  },
  {
    id: "process-timeline",
    category: "process",
    content:
      "Standard timeline for a full children's book: 2–4 months. Rush projects are possible with a 20–50% surcharge. The process includes: concept phase (1-2 weeks), sketches (2-3 weeks), revisions (1-2 weeks), final illustrations (4-6 weeks), file preparation (1 week).",
  },
  {
    id: "process-revisions",
    category: "process",
    content:
      "Revision policy: 2 rounds of revisions are included in the standard price. This is a normal part of the collaborative process — the author and illustrator work together to perfect each page. Additional revision rounds are charged separately at €10–30 per round.",
  },

  // ===== RED FLAGS =====
  {
    id: "red-flags",
    category: "advice",
    content:
      "Red flags when hiring an illustrator: 1) Prices below $500 for a full book — likely AI-generated or template work. 2) No sketch/revision stages means no client control over the result. 3) No contract is unprofessional. 4) AI-generated images lack character consistency across pages, which is critical for children's books where the same character appears throughout the story.",
  },

  // ===== CONTACT =====
  {
    id: "contact-info",
    category: "contact",
    content:
      "Contact Anastasiia Kolisnyk: Email: akolesnykl989@gmail.com. WhatsApp: +421 951 813 809. Behance: behance.net/akolesnyk14bf8. Instagram: @akolesnyk.sketch. Best way to get started: Use the contact form in the Services section on the website to describe your project and get a personalized quote within 48 hours.",
  },

  // ===== BLOG =====
  {
    id: "blog-rejection-story",
    category: "blog",
    content:
      "Blog post 'From 20 Rejections to My Own Design Studio': Anastasiia's personal story about transitioning from a career in finance to becoming a professional illustrator. She shares how she faced over 20 rejections, learned from each one, and eventually built a successful illustration and design practice in Slovakia.",
  },
  {
    id: "blog-illustration-process",
    category: "blog",
    content:
      "Blog post 'My Illustration Process: From Sketch to Final Artwork': A behind-the-scenes look at how Anastasiia creates children's book illustrations, featuring the Sigurd Fights the Dragon project. Shows the complete journey from initial pencil sketches through color studies to finished double-page spreads, with timelapse video.",
  },
  {
    id: "blog-illustration-cost",
    category: "blog",
    content:
      "Blog post 'How Much Does Children's Book Illustration Cost in 2026?': A comprehensive pricing guide for children's book illustration. Covers what affects cost (style, quantity, characters, timeline, experience), 2026 market rates with pricing tables, what's included in professional illustration services, a budget calculator, and red flags to watch for.",
  },

  // ===== LOCATION & LANGUAGES =====
  {
    id: "location-languages",
    category: "about",
    content:
      "Anastasiia is based in Trenčín, Slovakia but works with international clients across Europe and beyond. The website and all services are available in 4 languages: English, Slovak, Russian, and Ukrainian. She can communicate with clients in all four languages.",
  },
];
