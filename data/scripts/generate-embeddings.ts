/**
 * Generate vector embeddings for AI chat RAG pipeline
 *
 * Usage:
 *   OPENAI_API_KEY=sk-your-key pnpm generate-embeddings
 *
 * Generates: data/embeddings.json (~800KB)
 * Re-run after content updates.
 */

import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is required');
  process.exit(1);
}

// Content chunks about Anastasiia's services, portfolio, and process
// These will be the knowledge base for the AI chat
const contentChunks = [
  {
    id: 'services-overview',
    content: `Anastasiia Kolisnyk offers the following illustration and design services:
1. Full Children's Book Illustration (24-32 pages) — starting from $3,500, timeline 6-10 weeks
2. Book Cover Illustration — full cover with spine and back, starting from $400, timeline 1-2 weeks
3. Single Custom Illustration — for any purpose, starting from $150, timeline 3-7 days
4. Character Design — 3 poses + expressions + color palette, starting from $250, timeline 1 week
5. Label & Packaging Design — custom pricing based on complexity
6. Brand Identity & Logo Design — custom pricing based on scope`,
    category: 'services',
  },
  {
    id: 'about-artist',
    content: `Anastasiia Kolisnyk is a children's book illustrator and visual designer based in Trenčín, Slovakia. She creates warm, heartfelt illustrations for picture books, covers, and characters. She also specializes in branding, label design, and visual identity. She works with clients across Europe and communicates in English, Slovak, Russian, and Ukrainian.`,
    category: 'about',
  },
  {
    id: 'portfolio-books',
    content: `Anastasiia's portfolio includes several children's book projects:
- Magic World — a fantasy world with magical creatures
- The Nutcracker — classic fairy tale illustrations
- Sea Secrets — underwater adventure illustrations
- Sigurd — Viking/Norse mythology themed illustrations with dragons and dwarves
- Wild Swans — Hans Christian Andersen fairy tale
- Winter Adventures — winter-themed children's illustrations
Each project showcases her warm, detailed illustration style with rich colors and expressive characters.`,
    category: 'portfolio',
  },
  {
    id: 'process',
    content: `Anastasiia's working process:
1. Brief — discuss the project scope, style, timeline, and budget
2. Sketches — initial concept sketches and character designs for approval
3. Feedback — client reviews sketches and provides feedback
4. Revisions — adjustments based on feedback (typically 2-3 rounds included)
5. Final artwork — polished, publication-ready illustrations
6. File delivery — files in required formats (print-ready PDF, PNG, PSD)
Communication happens via email or WhatsApp. She typically responds within 24 hours.`,
    category: 'process',
  },
  {
    id: 'clients',
    content: `Notable clients include:
- Star Food — food product label and packaging design
- Baloon Party — event branding and visual identity
- Laser Craft Wood — logo and brand identity design
All three are ongoing partnerships with positive testimonials.`,
    category: 'clients',
  },
  {
    id: 'contact',
    content: `To contact Anastasiia:
- Email: akolesnykl989@gmail.com
- WhatsApp: +421 951 813 809
- Website contact form: akillustrator.com (Services section)
She is based in Trenčín, Slovakia and works remotely with clients worldwide.
Best way to start: fill out the contact form with your project details, or send a WhatsApp message.`,
    category: 'contact',
  },
  // Add more chunks as needed: pricing details, FAQ, style description, etc.
];

interface EmbeddingResult {
  id: string;
  content: string;
  embedding: number[];
  metadata: { category: string };
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`OpenAI API error: ${data.error.message}`);
  }

  return data.data[0].embedding;
}

async function main() {
  console.log(`🔄 Generating embeddings for ${contentChunks.length} content chunks...`);

  const results: EmbeddingResult[] = [];

  for (const chunk of contentChunks) {
    process.stdout.write(`  📝 ${chunk.id}...`);
    const embedding = await generateEmbedding(chunk.content);
    results.push({
      id: chunk.id,
      content: chunk.content,
      embedding,
      metadata: { category: chunk.category },
    });
    console.log(' ✅');

    // Small delay to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  const output = {
    chunks: results,
    model: 'text-embedding-3-small',
    dimensions: results[0]?.embedding.length || 1536,
    generatedAt: new Date().toISOString(),
    totalChunks: results.length,
  };

  const outputPath = path.join(process.cwd(), 'data/embeddings.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`\n✅ Done! Generated ${results.length} embeddings → data/embeddings.json (${fileSizeKB}KB)`);
}

main().catch(console.error);
