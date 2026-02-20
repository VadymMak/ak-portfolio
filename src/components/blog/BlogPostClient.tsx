"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ProtectedImage from "@/components/ui/ProtectedImage";
import type { BlogPost } from "@/lib/blog";
import styles from "./BlogPost.module.css";

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

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const t = useTranslations("blog");
  const tMenu = useTranslations("menu");
  const locale = useLocale();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const progress =
          scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    const container = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    if (container) container.scrollTo(0, 0);
  }, [post.slug]);

  // Custom markdown renderers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const components: Record<string, React.ComponentType<any>> = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      const isVideo = src && /\.(mp4|webm|mov)$/i.test(src);

      if (isVideo) {
        const base = src.replace(/\.[^.]+$/, "");
        return (
          <figure className={styles.figure}>
            <video
              className={styles.contentVideo}
              loop
              playsInline
              controls
              preload="metadata"
            >
              <source src={`${base}.webm`} type="video/webm" />
              <source src={`${base}.mp4`} type="video/mp4" />
            </video>
            {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
          </figure>
        );
      }

      return (
        <figure className={styles.figure}>
          <ProtectedImage
            src={src || ""}
            alt={alt || ""}
            className={styles.contentImage}
          />
          {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
        </figure>
      );
    },
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={styles.sectionHeading}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className={styles.subHeading}>{children}</h3>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: ({
      children,
      node,
    }: {
      children?: React.ReactNode;
      node?: Record<string, unknown>;
    }) => {
      const nodeChildren = node?.children as
        | Array<{ tagName?: string }>
        | undefined;
      if (nodeChildren?.length === 1 && nodeChildren[0].tagName === "img") {
        return <>{children}</>;
      }
      const text = typeof children === "string" ? children : "";
      if (text.includes("PLACEHOLDER")) return null;
      return <p>{children}</p>;
    },
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
      // PDF download links → styled button
      if (href && href.endsWith(".pdf")) {
        return (
          <a
            href={href}
            download
            className={styles.downloadButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      // Internal blog links
      if (href && href.startsWith("/blog/")) {
        return (
          <Link href={href} className={styles.inlineLink}>
            {children}
          </Link>
        );
      }
      // Hash links (e.g. #services → /#services)
      if (href && href.startsWith("#")) {
        return (
          <Link href={`/${href}`} className={styles.inlineLink}>
            {children}
          </Link>
        );
      }
      // External / other links
      return (
        <a href={href} className={styles.inlineLink}>
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className={styles.bold}>{children}</strong>
    ),
    hr: () => <div className={styles.divider} />,
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className={styles.italic}>{children}</em>
    ),
    // Table renderers (GFM)
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>{children}</table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className={styles.thead}>{children}</thead>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className={styles.th}>{children}</th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className={styles.td}>{children}</td>
    ),
    // List renderers
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className={styles.list}>{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className={styles.listOrdered}>{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className={styles.listItem}>{children}</li>
    ),
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        ref={progressRef}
        className={styles.progressBar}
        style={{ width: "0%" }}
        role="progressbar"
      />

      <article className={styles.article}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            {t("home")}
          </Link>
          <span className={styles.breadcrumbSep}>→</span>
          <Link href="/blog" className={styles.breadcrumbLink}>
            {tMenu("blog")}
          </Link>
          <span className={styles.breadcrumbSep}>→</span>
          <span className={styles.breadcrumbCurrent}>{post.title}</span>
        </nav>

        {/* Hero Cover */}
        <motion.div
          className={styles.heroWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ProtectedImage
            src={post.cover}
            alt={post.title}
            className={styles.heroImage}
          />
        </motion.div>

        {/* Post Header */}
        <motion.header
          className={styles.postHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.headerMeta}>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span className={styles.readTime}>
              {post.readingTime} {t("minRead")}
            </span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Post Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* CTA Block */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className={styles.ctaTitle}>{t("ctaTitle")}</h3>
          <p className={styles.ctaText}>{t("ctaText")}</p>
          <Link href="/#services" className={styles.ctaButton}>
            {t("ctaButton")}
          </Link>
        </motion.div>

        {/* Back to Blog */}
        <div className={styles.backWrap}>
          <Link href="/blog" className={styles.backLink}>
            ← {t("backToBlog")}
          </Link>
        </div>
      </article>
    </>
  );
}
