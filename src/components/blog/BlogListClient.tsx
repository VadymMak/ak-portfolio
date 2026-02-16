'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import ProtectedImage from '@/components/ui/ProtectedImage';
import type { BlogPost } from '@/lib/blog';
import styles from './BlogList.module.css';

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const loc = locale === 'sk' ? 'sk-SK'
    : locale === 'ua' ? 'uk-UA'
    : locale === 'ru' ? 'ru-RU'
    : 'en-US';
  return date.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric' });
}

interface BlogListClientProps {
  posts: BlogPost[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const t = useTranslations('blog');
  const tMenu = useTranslations('menu');
  const locale = useLocale();

  return (
    <div className={styles.blogList}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>
          {t('home')}
        </Link>
        <span className={styles.breadcrumbSeparator}>→</span>
        <span className={styles.breadcrumbCurrent}>
          {tMenu('blog')}
        </span>
      </nav>

      <motion.h1
        className={styles.pageTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {tMenu('blog')}
      </motion.h1>

      <div className={styles.postsGrid}>
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            className={styles.postCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              <div className={styles.coverWrap}>
                <ProtectedImage
                  src={post.cover}
                  alt={post.title}
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.postInfo}>
                <div className={styles.postMeta}>
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                  <span className={styles.readTime}>
                    {post.readingTime} {t('minRead')}
                  </span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.description}</p>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}