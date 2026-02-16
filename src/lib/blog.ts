import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost, BlogPostMeta, Locale } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * Calculate reading time from content string
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Get all blog post slugs (folder names in content/blog/)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

/**
 * Get blog post by slug and locale
 * Falls back to 'en' if requested locale doesn't exist
 */
export function getPostBySlug(slug: string, locale: Locale = 'en'): BlogPost | null {
  const postDir = path.join(BLOG_DIR, slug);

  if (!fs.existsSync(postDir)) return null;

  // Try requested locale, fallback to en
  let filePath = path.join(postDir, `${locale}.md`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(postDir, 'en.md');
  }
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    cover: data.cover || '',
    coverOg: data.coverOg || data.cover || '',
    tags: data.tags || [],
    videos: data.videos || [],
    content,
    readingTime: calculateReadingTime(content),
  };
}

/**
 * Get all posts metadata (for blog list page)
 * Sorted by date descending
 */
export function getAllPosts(locale: Locale = 'en'): BlogPostMeta[] {
  const slugs = getAllSlugs();

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug, locale);
      if (!post) return null;

      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        description: post.description,
        cover: post.cover,
        tags: post.tags,
        readingTime: post.readingTime,
      } satisfies BlogPostMeta;
    })
    .filter((post): post is BlogPostMeta => post !== null);

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html, { sanitize: false }).process(markdown);
  return result.toString();
}

/**
 * Get related posts by matching tags
 */
export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  locale: Locale = 'en',
  limit: number = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts(locale);

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      ...post,
      matchScore: post.tags.filter((tag) => currentTags.includes(tag)).length,
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
