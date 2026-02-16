import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPost, getAllSlugs } from '@/lib/blog';
import BlogPostClient from '@/components/blog/BlogPostClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPost(slug, locale);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Anastasiia Kolisnyk`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: `https://akillustrator.com${post.cover}` }],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPost(slug, locale);

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}