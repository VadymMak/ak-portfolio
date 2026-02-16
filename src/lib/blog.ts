import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  cover: string;
  description: string;
  tags: string[];
  content: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const SUPPORTED_LANGS = ['en', 'sk', 'ru', 'ua'] as const;
type Lang = typeof SUPPORTED_LANGS[number];

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Get all blog post slugs (folder names)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((name) => {
    const fullPath = path.join(BLOG_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

/**
 * Get a single blog post by slug and language
 */
export function getPost(slug: string, lang: string = 'en'): BlogPost | null {
  const postDir = path.join(BLOG_DIR, slug);
  if (!fs.existsSync(postDir)) return null;

  // Try requested lang, fall back to en
  const fileLang = SUPPORTED_LANGS.includes(lang as Lang) ? lang : 'en';
  let filePath = path.join(postDir, `${fileLang}.md`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(postDir, 'en.md');
  }
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    cover: data.cover || '',
    description: data.description || '',
    tags: data.tags || [],
    content,
    readingTime: estimateReadingTime(content),
  };
}

/**
 * Get all posts for a given language, sorted newest first
 */
export function getAllPosts(lang: string = 'en'): BlogPost[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => getPost(slug, lang))
    .filter((p): p is BlogPost => p !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}