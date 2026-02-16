# AK Portfolio v2 — Migration Plan

## From: React SPA + Vite + Netlify → To: Next.js 16 + TypeScript + Vercel

**Domain:** akillustrator.com (same domain, DNS repoint)  
**Started:** February 2026  
**Developer:** VadymMak  

---

## Architecture Comparison

| Aspect | Current (v1) | New (v2) |
|--------|-------------|----------|
| Framework | React 18 + Vite | Next.js 16 + React 19 |
| Language | JavaScript (JSX) | TypeScript (TSX) |
| Routing | React Router (SPA) | Next.js App Router (SSR/SSG) |
| Styling | CSS Modules | CSS Modules + CSS Custom Properties |
| Animations | Framer Motion | Framer Motion |
| i18n | Custom useTranslation + JSON | next-intl + JSON (same files) |
| Blog | Custom markdown parser | next-mdx-remote or gray-matter + remark |
| SEO | Manual meta tags in index.html | Next.js Metadata API (per-page) |
| Images | Manual WebP + lazy loading | next/image (auto optimization) |
| Hosting | Netlify | Vercel |
| AI Chat | ❌ None | ✅ RAG + OpenAI (like smartcontext.dev) |
| Dark Mode | ❌ None | Optional (CSS custom properties ready) |

---

## What Gets Transferred (Copy As-Is)

### 1. Images — `public/gallery/` → `public/gallery/`
```
gallery/
├── about/          (about-me_empty.webp, about-photo.webp, paper-bg.webp)
├── books/
│   ├── magic-world/   (full/ + thumb/)
│   ├── nutcracker/    (full_01-06.webp + thumb_01-06.webp)
│   ├── sea-secrets/   (full/ + thumb/ + video/)
│   ├── sigurd/        (full/ + thumb/ + video/)
│   ├── swans/         (full/ + thumb/ + decor/)
│   └── winter-adventures/ (full/ + thumb/)
├── branding/       (full/ + thumb/)
├── labels/         (label_01-09.webp)
├── logos/          (logo_01-06.webp)
└── background.webp
```

### 2. Locale Files — `src/locales/` → `src/locales/` (or `messages/`)
- `en.json` — English
- `sk.json` — Slovak
- `ru.json` — Russian
- `ua.json` — Ukrainian

These JSON files work directly with next-intl. May need minor key restructuring.

### 3. Blog Posts — Complete Transfer
```
Current:  src/blog/posts/from-rejection-to-illustrator/
          ├── en.md
          ├── ru.md
          ├── sk.md
          └── ua.md

New:      src/content/blog/from-rejection-to-illustrator/
          ├── en.md
          ├── ru.md
          ├── sk.md
          └── ua.md
```
Blog post #2 (Sigurd process) — will be added when published.

### 4. Blog Infrastructure to Port
- `blogIndex.js` → `src/lib/blog.ts` (TypeScript rewrite)
- `parseFrontmatter.js` → use `gray-matter` package instead
- `blogTranslations.js` → merge into locale JSONs
- Blog images/videos → `public/blog/` folder

### 5. Static Assets
- `favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`
- `og-image.jpg`
- `google02f9873c904396b1.html` (Search Console verification)

---

## What Gets Rebuilt (New Code, Same Design)

### Layout & Navigation
| Component (v1) | Component (v2) | Notes |
|----------------|----------------|-------|
| Layout.jsx | `src/app/layout.tsx` | Next.js root layout |
| Header.jsx | `src/components/layout/Header.tsx` | Scroll-aware, same design |
| Footer.jsx | `src/components/layout/Footer.tsx` | Same content |
| DesktopMenu.jsx | `src/components/layout/DesktopMenu.tsx` | Accordion + lang switcher |
| MobileMenu.jsx | `src/components/layout/MobileMenu.tsx` | Hamburger + Framer Motion |
| ProtectedImage.jsx | `src/components/ui/ProtectedImage.tsx` | Anti-theft + watermark |

### Home Page Sections (single-page scroll)
| Section (v1) | Component (v2) | Notes |
|-------------|----------------|-------|
| AboutSection.jsx | `src/components/sections/About.tsx` | Photo + bio |
| ChildrensBooksIntro.jsx | `src/components/sections/BooksIntro.tsx` | Intro text |
| ChildrensBooksSection.jsx | `src/components/sections/BooksGallery.tsx` | 6 books with lightbox |
| MagicWorldPage.jsx | `src/components/galleries/MagicWorld.tsx` | Gallery + video |
| NutCrackerPage.jsx | `src/components/galleries/Nutcracker.tsx` | Gallery |
| SeaSecretsPage.jsx | `src/components/galleries/SeaSecrets.tsx` | Gallery + video |
| SiguardPage.jsx | `src/components/galleries/Sigurd.tsx` | Gallery + video |
| WildSwansPage.jsx | `src/components/galleries/WildSwans.tsx` | Gallery |
| WinterAdventuresPage.jsx | `src/components/galleries/WinterAdventures.tsx` | Gallery |
| DesignBrandingSection.jsx | `src/components/sections/DesignBranding.tsx` | Tabbed (labels/logos/branding) |
| TestimonialsSection.jsx | `src/components/sections/Testimonials.tsx` | 3 client reviews |
| ServicesSection.jsx | `src/components/sections/Services.tsx` | 6 service types |
| ContactSection.jsx | `src/components/sections/Contact.tsx` | Form with validation |

### Blog (Separate Routes)
| Page (v1) | Page (v2) | Notes |
|-----------|-----------|-------|
| BlogList.jsx | `src/app/blog/page.tsx` | SSG, grid layout |
| BlogPost.jsx | `src/app/blog/[slug]/page.tsx` | SSG per post, progress bar |

### New: AI Chat
| Component | Path | Notes |
|-----------|------|-------|
| ChatWidget | `src/components/chat/ChatWidget.tsx` | Floating bubble + panel |
| ChatMessage | `src/components/chat/ChatMessage.tsx` | Message bubbles |
| ChatInput | `src/components/chat/ChatInput.tsx` | Input + send |
| API Route | `src/app/api/chat/route.ts` | Streaming + RAG |
| Embeddings | `data/embeddings.json` | Pre-generated vectors |
| Generator | `scripts/generate-embeddings.ts` | Build-time script |

---

## New Project Structure

```
ak-portfolio-v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx                # Home (scroll sections)
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog list (SSG)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Blog post (SSG)
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts        # AI chat streaming endpoint
│   │   ├── sitemap.ts              # Auto-generated
│   │   └── robots.ts               # Auto-generated
│   │
│   ├── components/
│   │   ├── layout/                 # Header, Footer, DesktopMenu, MobileMenu
│   │   ├── sections/               # About, BooksIntro, BooksGallery, etc.
│   │   ├── galleries/              # Individual book galleries
│   │   ├── blog/                   # PostCard, ProgressBar, Breadcrumbs
│   │   ├── chat/                   # ChatWidget, ChatMessage, ChatInput
│   │   ├── ui/                     # ProtectedImage, Lightbox, SectionTitle
│   │   └── shared/                 # JsonLd, AnimatedSection
│   │
│   ├── lib/
│   │   ├── blog.ts                 # Blog utilities (parse, list, etc.)
│   │   ├── ai.ts                   # RAG pipeline, embeddings search
│   │   └── utils.ts                # Helpers
│   │
│   ├── content/
│   │   └── blog/                   # Markdown posts (transferred)
│   │       └── from-rejection-to-illustrator/
│   │
│   ├── locales/                    # Transferred JSON locale files
│   │   ├── en.json
│   │   ├── sk.json
│   │   ├── ru.json
│   │   └── ua.json
│   │
│   ├── styles/
│   │   ├── globals.css             # CSS custom properties, reset, fonts
│   │   └── variables.css           # Design tokens
│   │
│   └── types/                      # TypeScript interfaces
│       └── index.ts
│
├── public/
│   ├── gallery/                    # All images (transferred as-is)
│   ├── blog/                       # Blog images/videos
│   ├── favicon.svg
│   └── og-image.jpg
│
├── data/
│   ├── embeddings.json             # AI chat vector store
│   └── scripts/
│       └── generate-embeddings.ts
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local                      # OPENAI_API_KEY
```

---

## Phase-by-Phase Build Order

### Phase 1: Foundation (Session 1) ✅ START HERE
- [x] Create repo, init Next.js 16 + TypeScript
- [ ] Configure: CSS Modules, Framer Motion, next-intl
- [ ] Set up CSS custom properties (colors, fonts, spacing from v1)
- [ ] Root layout with Cormorant Garamond + Montserrat fonts
- [ ] Basic page structure (home, blog list, blog post)
- [ ] Deploy empty shell to Vercel (verify build works)

### Phase 2: Layout & Navigation (Sessions 2-3)
- [ ] Header with scroll-aware hide/show
- [ ] Desktop menu with accordion sections
- [ ] Mobile hamburger menu with Framer Motion overlay
- [ ] Language switcher (4 languages)
- [ ] Footer
- [ ] Transfer locale JSON files, wire up next-intl

### Phase 3: Home Sections (Sessions 4-6)
- [ ] About section (photo + bio)
- [ ] Children's Books intro
- [ ] Book gallery component (reusable for all 6 books)
- [ ] Lightbox component (images + video)
- [ ] ProtectedImage component
- [ ] Individual book galleries (Magic World, Nutcracker, Sea Secrets, Sigurd, Wild Swans, Winter Adventures)
- [ ] Design & Branding tabbed section (labels, logos, branding)

### Phase 4: Remaining Sections (Sessions 7-8)
- [ ] Testimonials (3 clients)
- [ ] Services (6 types)
- [ ] Contact form (validation, honeypot, project type dropdown)
- [ ] Framer Motion scroll animations throughout

### Phase 5: Blog System (Sessions 9-10)
- [ ] Transfer markdown posts
- [ ] Blog list page with SSG
- [ ] Blog post page with SSG
- [ ] Reading progress bar
- [ ] Breadcrumbs
- [ ] CTA block at end
- [ ] Related posts
- [ ] Blog translations integration

### Phase 6: i18n Deep Integration (Sessions 11-12)
- [ ] All sections rendering correct translations
- [ ] Language routing (URL-based or cookie-based)
- [ ] Geo-restriction for UA/RU
- [ ] Blog posts in 4 languages
- [ ] SEO meta tags per language

### Phase 7: SEO & Performance (Session 13)
- [ ] Metadata API for all pages
- [ ] JSON-LD schemas (WebSite, Person, Article)
- [ ] Auto sitemap + robots.txt
- [ ] OG images
- [ ] Security headers in next.config.ts
- [ ] Lighthouse optimization target: 95+ Performance, 100 SEO

### Phase 8: AI Chat (Sessions 14-15)
- [ ] Content chunks preparation (~25-30 chunks)
- [ ] Embedding generation script
- [ ] API route with streaming + rate limiting
- [ ] Chat UI (floating widget, messages, input)
- [ ] Multilingual system prompt
- [ ] Lazy loading (dynamic import)

### Phase 9: Domain Migration (Session 16)
- [ ] DNS: akillustrator.com → Vercel
- [ ] SSL certificate
- [ ] Netlify → Vercel redirects
- [ ] Google Search Console relink
- [ ] GA4 verify tracking
- [ ] Test all 4 languages live

### Phase 10: QA & Polish (Sessions 17-18)
- [ ] Cross-browser testing
- [ ] Mobile responsive check all breakpoints
- [ ] Animation performance
- [ ] Visual parity with v1 (nothing should look worse)
- [ ] Blog post #2 integration
- [ ] Final Lighthouse audit

---

## Design Tokens (From Current Site)

```css
/* Colors */
--color-dark-green: #2D4A43;
--color-warm-beige: #F9F6F0;
--color-soft-green: #5A7A70;
--color-light-beige: #FEFCF8;
--color-theme: #2D4A43;

/* Fonts */
--font-heading: 'Cormorant Garamond', serif;
--font-body: 'Montserrat', sans-serif;

/* Spacing */
--max-width-portfolio: 1400px;
--max-width-blog-list: 960px;
--max-width-blog-post: 760px;
```

---

## Cost Comparison

| Item | Current (Netlify) | New (Vercel) |
|------|-------------------|--------------|
| Hosting | $0 (free tier) | $0 (Hobby tier) |
| Domain | Already owned | Same domain |
| OpenAI API (chat) | N/A | ~$1-2/month |
| **Total** | **$0/month** | **~$1-2/month** |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| SEO ranking drop during migration | Medium | Set up 301 redirects, resubmit sitemap same day |
| Blog post URLs change | High | Keep same URL structure: /blog/slug |
| Image quality regression | Medium | Transfer WebP files as-is, use next/image |
| i18n complexity with App Router | Medium | Use next-intl middleware pattern |
| DNS propagation delay | Low | Switch during low-traffic hours, TTL=300 |
| Missing translations in new structure | Medium | Automated check script before deploy |
