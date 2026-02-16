import { getLocale, getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';

export async function generateMetadata() {
  const t = await getTranslations('blog');
  return {
    title: `${t('pageTitle')} | Anastasiia Kolisnyk`,
    description: t('pageDescription'),
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  return <BlogListClient posts={posts} />;
}