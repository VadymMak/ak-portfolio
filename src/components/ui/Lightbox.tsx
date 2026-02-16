'use client';

import { useEffect, useCallback, useRef } from 'react';
import { GalleryItem } from '@/lib/booksData';
import ProtectedImage from '../ui/ProtectedImage';
import styles from './Lightbox.module.css';

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ items, activeIndex, onClose, onNext, onPrev }: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const current = items[activeIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    containerRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className={styles.lightbox}
      onClick={onClose}
      tabIndex={0}
      ref={containerRef}
    >
      {/* Close */}
      <button className={styles.closeBtn} onClick={onClose}>✕</button>

      {/* Prev */}
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ←
      </button>

      {/* Content */}
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {current.type === 'video' ? (
          <video
            className={styles.video}
            controls
            autoPlay
            playsInline
            poster={current.full}
            key={activeIndex}
          >
            {current.webm && <source src={current.webm} type="video/webm" />}
            {current.mp4 && <source src={current.mp4} type="video/mp4" />}
          </video>
        ) : (
          <ProtectedImage
            src={current.full}
            alt={current.alt}
            className={styles.image}
          />
        )}
      </div>

      {/* Next */}
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        →
      </button>

      {/* Counter */}
      <div className={styles.counter}>
        {activeIndex + 1} / {items.length}
      </div>
    </div>
  );
}