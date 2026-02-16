import fs from 'fs';
import path from 'path';

interface ContentChunk {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    category: string;
    language?: string;
  };
}

interface EmbeddingsData {
  chunks: ContentChunk[];
  model: string;
  generatedAt: string;
}

const EMBEDDINGS_PATH = path.join(process.cwd(), 'data/embeddings.json');

/**
 * Load pre-generated embeddings from JSON file
 */
function loadEmbeddings(): EmbeddingsData | null {
  try {
    if (!fs.existsSync(EMBEDDINGS_PATH)) return null;
    const data = fs.readFileSync(EMBEDDINGS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    console.error('Failed to load embeddings');
    return null;
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Generate embedding for a query using OpenAI API
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Find most relevant content chunks for a query
 */
export async function findRelevantContext(
  query: string,
  topK: number = 3
): Promise<string> {
  const embeddings = loadEmbeddings();

  if (!embeddings) {
    // Fallback context when no embeddings file exists
    return getFallbackContext();
  }

  const queryEmbedding = await generateEmbedding(query);

  // Calculate similarity for each chunk
  const results = embeddings.chunks
    .map((chunk) => ({
      content: chunk.content,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  return results.map((r) => r.content).join('\n\n');
}

/**
 * Fallback context when embeddings are not available
 */
function getFallbackContext(): string {
  return `
Anastasiia Kolisnyk is a children's book illustrator and visual designer based in Trenčín, Slovakia.

Services offered:
- Full Children's Book Illustration (24-32 pages) — starting from $3,500, timeline 6-10 weeks
- Book Cover Illustration — starting from $400, timeline 1-2 weeks
- Single Illustration — starting from $150, timeline 3-7 days
- Character Design (3 poses + expressions) — starting from $250, timeline 1 week
- Label & Packaging Design — custom pricing
- Brand Identity & Logo Design — custom pricing

Portfolio includes: Magic World, The Nutcracker, Sea Secrets, Sigurd, Wild Swans, Winter Adventures.
Clients: Star Food, Baloon Party, Laser Craft Wood.

Process: Brief → Sketches → Feedback → Final artwork → File delivery.
Languages: English, Slovak, Russian, Ukrainian.
Contact: akolesnykl989@gmail.com | WhatsApp: +421 951 813 809
  `.trim();
}
