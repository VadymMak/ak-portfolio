"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ProtectedImage from "@/components/ui/ProtectedImage";
import SectionTitle from "@/components/ui/SectionTitle";
import type { BlogPost } from "@/lib/blog";
import styles from "./BlogPreview.module.css";

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const loc =
    locale === "sk"
      ? "sk-SK"
      : locale === "ua"
        ? "uk-UA"
        : locale === "ru"
          ? "ru-RU"
          : "en-US";
  return date.toLocaleDateString(loc, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const t = useTranslations("blog");
  const tMenu = useTranslations("menu");
  const locale = useLocale();

  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className={styles.section}>
      <SectionTitle>{tMenu("blog")}</SectionTitle>
      <p className={styles.subtitle}>{t("previewSubtitle")}</p>

      <div className={styles.grid}>
        {posts.slice(0, 3).map((post, index) => (
          <motion.article
            key={post.slug}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
              <div className={styles.coverWrap}>
                <ProtectedImage
                  src={post.cover}
                  alt={post.title}
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <time dateTime={post.date}>
                    {formatDate(post.date, locale)}
                  </time>
                  <span className={styles.readTime}>
                    {post.readingTime} {t("minRead")}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>{post.description}</p>
                <div className={styles.tags}>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        className={styles.viewAllWrap}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/blog" className={styles.viewAllBtn}>
          {t("viewAll")} →
        </Link>
      </motion.div>
    </section>
  );
}
