'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ProtectedImage from '@/components/ui/ProtectedImage';
import Lightbox from '@/components/ui/Lightbox';
import styles from './DesignPortfolio.module.css';
import type { GalleryItem } from '@/lib/booksData';

// ========== PROJECT DATA ==========

interface Project {
  src: string;
  full?: string;
  alt: string;
  name: string;
  type: string;
  category: string;
  filter: string[];
}

const projects: Project[] = [
  // Labels
  { src: '/gallery/labels/label_01.webp', alt: 'Sunflower oil label', name: 'Star Food', type: 'Product Label', category: 'Sunflower Oil', filter: ['labels'] },
  { src: '/gallery/labels/label_09.webp', alt: 'Star sunflower oil label', name: 'Star Food', type: 'Product Label', category: 'Star Sunflower Oil', filter: ['labels'] },
  // Restaurant / Branding
  { src: '/gallery/labels/label_02.webp', alt: 'Adriano menu design', name: 'Andriano Restaurant', type: 'Menu Design', category: 'Restaurant Identity', filter: ['restaurant', 'branding'] },
  { src: '/gallery/labels/label_04.webp', alt: 'Adriano business cards', name: 'Andriano Restaurant', type: 'Business Cards', category: 'Print Design', filter: ['restaurant', 'print'] },
  { src: '/gallery/labels/label_05.webp', alt: 'Adriano restaurant flyer', name: 'Andriano Restaurant', type: 'Promotional Flyer', category: 'Restaurant Marketing', filter: ['restaurant', 'print'] },
  { src: '/gallery/labels/label_06.webp', alt: 'Adriano seafood poster', name: 'Andriano Restaurant', type: 'Poster Design', category: 'Restaurant Branding', filter: ['restaurant', 'print'] },
  // Logos
  { src: '/gallery/logos/logo_01.webp', alt: 'Star Food logo', name: 'Star Food', type: 'Logo Design', category: 'Food & Beverage', filter: ['logo', 'branding'] },
  { src: '/gallery/logos/logo_02.webp', alt: 'DCT logo', name: 'DCT', type: 'Logo Design', category: 'Automotive Diagnostics', filter: ['logo'] },
  { src: '/gallery/logos/logo_03.webp', alt: 'Adriano Golf Restaurant logo', name: 'Andriano', type: 'Logo Design', category: 'Golf Restaurant', filter: ['logo', 'restaurant'] },
  { src: '/gallery/logos/logo_05.webp', alt: 'Balloon Party logo', name: 'Balloon Party', type: 'Logo Design', category: 'Events & Entertainment', filter: ['logo', 'branding'] },
  { src: '/gallery/logos/logo_06.webp', alt: 'Laser Craft Wood logo', name: 'Laser Craft', type: 'Logo Design', category: 'Woodworking & Crafts', filter: ['logo'] },
  // Print & Digital
  { src: '/gallery/branding/thumb/thumb_01.webp', full: '/gallery/branding/full/full_01.webp', alt: 'Botanical linen tea towel', name: 'Textile Print', type: 'Product Design', category: 'Print Design', filter: ['print'] },
];

const FILTERS = ['all', 'branding', 'labels', 'logo', 'restaurant', 'print'] as const;
type FilterType = typeof FILTERS[number];

export default function DesignPortfolio() {
  const t = useTranslations('designPage.portfolio');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.filter.includes(activeFilter));

  const lightboxItems: GalleryItem[] = filtered.map(p => ({
    type: 'image',
    thumb: p.src,
    full: p.full || p.src,
    alt: p.alt,
  }));

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const goNext = useCallback(() => setActiveIndex(i => (i + 1) % lightboxItems.length), [lightboxItems.length]);
  const goPrev = useCallback(() => setActiveIndex(i => (i - 1 + lightboxItems.length) % lightboxItems.length), [lightboxItems.length]);

  return (
    <section id="design-portfolio" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t('label')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
              onClick={() => { setActiveFilter(f); setLightboxOpen(false); }}
            >
              {t(`filter.${f}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={styles.grid}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={`${project.src}-${i}`}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => openLightbox(i)}
              >
                <ProtectedImage
                  src={project.src}
                  alt={project.alt}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayTag}>{project.type}</span>
                  <span className={styles.overlayName}>{project.name}</span>
                  <span className={styles.overlayDesc}>{project.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
}
