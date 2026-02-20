import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getPost, getAllSlugs } from "@/lib/blog";
import BlogPostClient from "@/components/blog/BlogPostClient";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ak-portfolio-sigma.vercel.app";

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

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Anastasiia Kolisnyk`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: `${BASE_URL}${post.cover}`, width: 1200, height: 630 }],
      type: "article",
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
