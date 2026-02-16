'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BookData, GalleryItem } from '@/lib/booksData';
import SectionTitle from '../ui/SectionTitle';
import ProtectedImage from '../ui/ProtectedImage';
import Lightbox from '../ui/Lightbox';
import styles from './BookGallery.module.css';

// Video preview: autoplay on scroll (desktop), play button (mobile)
function VideoGridItem({ item }: { item: GalleryItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        className={styles.image}
        loop
        muted
        playsInline
        poster={item.thumb}
        preload="none"
      >
        {item.webm && <source src={item.webm} type="video/webm" />}
        {item.mp4 && <source src={item.mp4} type="video/mp4" />}
      </video>
      {isMobile && (
        <div className={styles.playOverlay}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="white" strokeWidth="2" opacity="0.8" />
            <path d="M19 15L35 24L19 33V15Z" fill="white" opacity="0.9" />
          </svg>
        </div>
      )}
    </div>
  );
}

// Main gallery component
interface BookGalleryProps {
  book: BookData;
}

export default function BookGallery({ book }: BookGalleryProps) {
  const t = useTranslations('books');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % book.items.length), [book.items.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + book.items.length) % book.items.length), [book.items.length]);

  const gridClass = `${styles.grid} ${styles[`grid_${book.gridLayout}`] || ''}`;

  return (
    <section id={book.id} className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>{t(book.titleKey)}</SectionTitle>
      </motion.div>

      <div className={gridClass}>
        {book.items.map((item, index) => (
          <motion.div
            key={index}
            className={styles.gridItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            onClick={() => openLightbox(index)}
          >
            {item.type === 'video' ? (
              <VideoGridItem item={item} />
            ) : (
              <ProtectedImage
                src={item.thumb}
                alt={item.alt}
                className={styles.image}
              />
            )}
          </motion.div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          items={book.items}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
}