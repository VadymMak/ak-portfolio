import { Metadata } from 'next';
// import { getPostBySlug, getAllPosts } from '@/lib/blog';
// import ProgressBar from '@/components/blog/ProgressBar';
// import Breadcrumbs from '@/components/blog/Breadcrumbs';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static pages for all blog posts at build time
// export async function generateStaticParams() {
//   const posts = getAllPosts();
//   return posts.map((post) => ({ slug: post.slug }));
// }

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  // const post = getPostBySlug(slug);

  return {
    title: slug, // Will be: post.title
    description: `Blog post: ${slug}`, // Will be: post.description
    alternates: {
      canonical: `https://akillustrator.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // const post = getPostBySlug(slug);

  return (
    <article style={{ maxWidth: '760px', margin: '0 auto', padding: '8rem 2rem' }}>
      {/* <ProgressBar /> */}
      {/* <Breadcrumbs post={post} /> */}
      <h1>{slug}</h1>
      <p>Blog post content will render here with full-bleed images, video embeds, and reading progress bar.</p>
      {/* <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} /> */}
      {/* CTA block */}
      {/* Related posts */}
    </article>
  );
}
