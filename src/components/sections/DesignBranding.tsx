'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionTitle from '../ui/SectionTitle';
import ProtectedImage from '../ui/ProtectedImage';
import Lightbox from '../ui/Lightbox';
import styles from './DesignBranding.module.css';
import type { GalleryItem } from '@/lib/booksData';

// ========== IMAGE DATA ==========

interface LabelImage {
  src: string; alt: string; product: string; category: string;
}

interface LogoImage {
  src: string; alt: string; client: string; category: string; bgColor: string; theme: 'dark' | 'light';
}

interface BrandingImage {
  thumb: string; full: string; alt: string; product: string; category: string;
}

const labelImages: LabelImage[] = [
  { src: '/gallery/labels/label_01.webp', alt: 'Sunflower oil label', product: 'Product Label', category: 'Sunflower Oil' },
  { src: '/gallery/labels/label_09.webp', alt: 'Star sunflower oil label', product: 'Product Label', category: 'Star Sunflower Oil' },
  { src: '/gallery/labels/label_05.webp', alt: 'Adriano restaurant flyer', product: 'Promotional Flyer', category: 'Adriano Restaurant' },
  { src: '/gallery/labels/label_04.webp', alt: 'Adriano business cards', product: 'Business Cards', category: 'Adriano Restaurant' },
  { src: '/gallery/labels/label_06.webp', alt: 'Adriano seafood poster', product: 'Poster Design', category: 'Adriano Restaurant' },
  { src: '/gallery/labels/label_02.webp', alt: 'Adriano menu design', product: 'Menu Design', category: 'Adriano Restaurant' },
];

const logoImages: LogoImage[] = [
  { src: '/gallery/logos/logo_02.webp', alt: 'DCT Diagecutunetrencin logo', client: 'DCT', category: 'Automotive Diagnostics', bgColor: '#1C1C1C', theme: 'dark' },
  { src: '/gallery/logos/logo_06.webp', alt: 'Laser Craft Wood logo', client: 'Laser Craft Wood', category: 'Woodworking & Crafts', bgColor: '#C4BAB0', theme: 'light' },
  { src: '/gallery/logos/logo_03.webp', alt: 'Adriano Golf Restaurant logo', client: 'Adriano', category: 'Golf Restaurant', bgColor: '#1A1A1A', theme: 'dark' },
  { src: '/gallery/logos/logo_01.webp', alt: 'Star Food logo', client: 'Star Food', category: 'Food & Beverage', bgColor: '#EEF4F8', theme: 'light' },
  { src: '/gallery/logos/logo_05.webp', alt: 'Balloon Party logo', client: 'Balloon Party', category: 'Events & Entertainment', bgColor: '#E8F4FD', theme: 'light' },
  { src: '/gallery/logos/logo_04.webp', alt: 'Geometric logo', client: 'Star Food', category: 'Food & Beverage', bgColor: '#F0F0F0', theme: 'light' },
];

const brandingImages: BrandingImage[] = [
  { thumb: '/gallery/branding/thumb/thumb_01.webp', full: '/gallery/branding/full/full_01.webp', alt: 'Botanical linen tea towel', product: 'Tea Towel', category: 'Textile Print' },
  { thumb: '/gallery/branding/thumb/thumb_02.webp', full: '/gallery/branding/full/full_02.webp', alt: 'Impressionist Mood notebook', product: 'Notebook', category: 'Stationery' },
  { thumb: '/gallery/branding/thumb/thumb_04.webp', full: '/gallery/branding/full/full_04.webp', alt: 'Floral magnolia pillow', product: 'Decorative Pillow', category: 'Home Decor' },
  { thumb: '/gallery/branding/thumb/thumb_05.webp', full: '/gallery/branding/full/full_05.webp', alt: 'Green floral silk scarf', product: 'Silk Scarf', category: 'Accessories' },
  { thumb: '/gallery/branding/thumb/thumb_03.webp', full: '/gallery/branding/full/full_03.webp', alt: 'Advent 2026 calendar', product: 'Wall Calendar', category: 'Stationery' },
  { thumb: '/gallery/branding/thumb/thumb_10.webp', full: '/gallery/branding/full/full_10.webp', alt: 'Lavender field tote bag', product: 'Tote Bag', category: 'Accessories' },
];

const TABS = ['labels', 'logos', 'branding'] as const;
type TabType = typeof TABS[number];

// Convert tab data to lightbox-compatible items
function toLightboxItems(tab: TabType): GalleryItem[] {
  switch (tab) {
    case 'labels':
      return labelImages.map((img) => ({ type: 'image', thumb: img.src, full: img.src, alt: img.alt }));
    case 'logos':
      return logoImages.map((img) => ({ type: 'image', thumb: img.src, full: img.src, alt: img.alt }));
    case 'branding':
      return brandingImages.map((img) => ({ type: 'image', thumb: img.thumb, full: img.full, alt: img.alt }));
  }
}

// ========== COMPONENT ==========

export default function DesignBranding() {
  const t = useTranslations('designBranding');
  const [activeTab, setActiveTab] = useState<TabType>('labels');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const lightboxItems = toLightboxItems(activeTab);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % lightboxItems.length), [lightboxItems.length]);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length), [lightboxItems.length]);

  return (
    <section id="design-branding" className={styles.section}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>{t('title')}</SectionTitle>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </motion.div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab(tab); setLightboxOpen(false); }}
          >
            {t(`tab.${tab}`)}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Labels */}
        {activeTab === 'labels' && (
          <div className={styles.gridLabels}>
            {labelImages.map((image, index) => (
              <motion.div
                key={index}
                className={styles.gridItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                onClick={() => openLightbox(index)}
              >
                <ProtectedImage src={image.src} alt={image.alt} className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.overlayName}>{image.product}</span>
                  <span className={styles.overlayCategory}>{image.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Logos */}
        {activeTab === 'logos' && (
          <div className={styles.gridLogos}>
            {logoImages.map((logo, index) => (
              <motion.div
                key={index}
                className={`${styles.logoCard} ${logo.theme === 'dark' ? styles.logoDark : styles.logoLight}`}
                style={{ backgroundColor: logo.bgColor }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => openLightbox(index)}
              >
                <div className={styles.logoImageWrapper}>
                  <ProtectedImage src={logo.src} alt={logo.alt} className={styles.logoImage} />
                </div>
                <div className={styles.overlay}>
                  <span className={styles.overlayName}>{logo.client}</span>
                  <span className={styles.overlayCategory}>{logo.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Branding */}
        {activeTab === 'branding' && (
          <div className={styles.gridBranding}>
            {brandingImages.map((image, index) => (
              <motion.div
                key={index}
                className={styles.gridItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => openLightbox(index)}
              >
                <ProtectedImage src={image.thumb} alt={image.alt} className={styles.image} />
                <div className={styles.overlay}>
                  <span className={styles.overlayName}>{image.product}</span>
                  <span className={styles.overlayCategory}>{image.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

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