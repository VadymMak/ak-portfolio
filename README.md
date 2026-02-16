# AK Portfolio v2

**Anastasiia Kolisnyk — Children's Book Illustrator & Visual Designer**

[![Live Site](https://img.shields.io/badge/Live-akillustrator.com-2D4A43?style=flat-square)](https://akillustrator.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://vercel.com)

---

## About

Portfolio and blog for Anastasiia Kolisnyk, showcasing children's book illustrations, branding, label design, and visual identity work. Features an AI chat assistant for client inquiries.

Rebuilt from React SPA (v1) to Next.js with SSR/SSG, TypeScript, and enhanced SEO.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | CSS Modules, CSS Custom Properties |
| **Animations** | Framer Motion |
| **i18n** | next-intl (EN, SK, RU, UA) |
| **AI Chat** | OpenAI API (gpt-4o-mini), RAG pipeline |
| **Blog** | Markdown + gray-matter, SSG |
| **SEO** | Metadata API, JSON-LD, auto sitemap |
| **Deployment** | Vercel |

## Getting Started

```bash
pnpm install
cp .env.example .env.local
# Add OPENAI_API_KEY
pnpm dev
```

## Migration from v1

See [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) for full details.

**Transferred assets:**
- `public/gallery/` — all images (WebP)
- `src/locales/` — 4 language JSON files
- `src/content/blog/` — markdown posts
- `public/blog/` — blog images and videos

## Developer

Built by [VadymMak](https://github.com/VadymMak) / [smartcontext.dev](https://smartcontext.dev)
