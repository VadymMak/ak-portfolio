// scripts/generate-embeddings.ts
// Run: npx tsx scripts/generate-embeddings.ts
// Requires: OPENAI_API_KEY in .env.local

import { config } from "dotenv";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

interface ContentChunk {
  id: string;
  category: string;
  content: string;
}

interface EmbeddingEntry {
  id: string;
  category: string;
  content: string;
  embedding: number[];
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = "text-embedding-3-small"; // Cheapest, 1536 dimensions
const BATCH_SIZE = 20;

async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      input: texts,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.data.map((item: { embedding: number[] }) => item.embedding);
}

async function main() {
  if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not found in .env.local");
    process.exit(1);
  }

  console.log("📦 Loading content chunks...");

  // Import chunks dynamically
  const chunksPath = resolve(process.cwd(), "data/chunks.ts");
  if (!existsSync(chunksPath)) {
    console.error("❌ data/chunks.ts not found");
    process.exit(1);
  }

  // Read and parse chunks file
  const chunksSource = readFileSync(chunksPath, "utf-8");
  // Extract the array using regex (simple approach for TS file)
  const chunksMatch = chunksSource.match(
    /export const chunks:\s*ContentChunk\[\]\s*=\s*(\[[\s\S]*\]);/,
  );
  if (!chunksMatch) {
    console.error("❌ Could not parse chunks from data/chunks.ts");
    process.exit(1);
  }

  // Eval the array (safe since we control the file)
  const chunks: ContentChunk[] = eval(chunksMatch[1]);
  console.log(`📝 Found ${chunks.length} chunks`);

  const results: EmbeddingEntry[] = [];

  // Process in batches
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.content);

    console.log(
      `🔄 Generating embeddings for batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`,
    );

    const embeddings = await getEmbeddings(texts);

    for (let j = 0; j < batch.length; j++) {
      results.push({
        id: batch[j].id,
        category: batch[j].category,
        content: batch[j].content,
        embedding: embeddings[j],
      });
    }

    // Small delay between batches to respect rate limits
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  // Save to data/embeddings.json
  const outputPath = resolve(process.cwd(), "data/embeddings.json");
  writeFileSync(outputPath, JSON.stringify(results, null, 0));

  const fileSizeKB = Math.round(readFileSync(outputPath).length / 1024);
  console.log(`\n✅ Generated ${results.length} embeddings`);
  console.log(`📁 Saved to data/embeddings.json (${fileSizeKB} KB)`);
  console.log(`🧮 Dimensions: ${results[0]?.embedding.length}`);
}

main().catch(console.error);
