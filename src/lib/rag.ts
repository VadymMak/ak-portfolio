// src/lib/rag.ts
// Retrieval-Augmented Generation: search embeddings for relevant context

import embeddingsData from "../../data/embeddings.json";

interface EmbeddingEntry {
  id: string;
  category: string;
  content: string;
  embedding: number[];
}

const embeddings: EmbeddingEntry[] = embeddingsData as EmbeddingEntry[];

// Cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

// Get embedding for a query from OpenAI
async function getQueryEmbedding(query: string): Promise<number[]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: query,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get query embedding");
  }

  const data = await response.json();
  return data.data[0].embedding;
}

export interface SearchResult {
  id: string;
  category: string;
  content: string;
  score: number;
}

// Search for top-K most relevant chunks
export async function searchContext(
  query: string,
  topK: number = 4,
  minScore: number = 0.3,
): Promise<SearchResult[]> {
  const queryEmbedding = await getQueryEmbedding(query);

  const scored = embeddings.map((entry) => ({
    id: entry.id,
    category: entry.category,
    content: entry.content,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  return scored
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

// Format search results into context string for the prompt
export function formatContext(results: SearchResult[]): string {
  if (results.length === 0) return "";

  return (
    "\n\nRELEVANT CONTEXT (use this to answer accurately):\n" +
    results
      .map((r) => `[${r.category.toUpperCase()}] ${r.content}`)
      .join("\n\n")
  );
}
