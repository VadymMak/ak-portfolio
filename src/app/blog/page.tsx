import { Metadata } from 'next';
// import { getAllPosts } from '@/lib/blog';
// import PostCard from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about illustration process, children\'s book creation, and design insights by Anastasiia Kolisnyk.',
  alternates: {
    canonical: 'https://akillustrator.com/blog',
  },
};

export default function BlogPage() {
  // const posts = getAllPosts();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '8rem 2rem' }}>
      <h1>Blog</h1>
      <p>Blog list page — will display post cards with cover images, titles, excerpts, and tags.</p>
      {/* {posts.map(post => <PostCard key={post.slug} post={post} />)} */}
    </div>
  );
}
