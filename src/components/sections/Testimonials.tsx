'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionTitle from '../ui/SectionTitle';
import ProtectedImage from '../ui/ProtectedImage';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 'starFood',
    logo: '/gallery/logos/logo_01.webp',
    alt: 'Star Food logo',
  },
  {
    id: 'baloonParty',
    logo: '/gallery/logos/logo_05.webp',
    alt: 'Baloon Party logo',
  },
  {
    id: 'laserCraft',
    logo: '/gallery/logos/logo_06.webp',
    alt: 'Laser Craft Wood logo',
  },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.titleWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle>{t('title')}</SectionTitle>
          </motion.div>

          <motion.div
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className={styles.descriptionText}>{t('subtitle')}</p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className={styles.quoteIcon}>&ldquo;</div>
              <p className={styles.cardText}>{t(`${item.id}.text`)}</p>
              <div className={styles.cardAuthor}>
                <div className={styles.logoWrapper}>
                  <ProtectedImage
                    src={item.logo}
                    alt={item.alt}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{t(`${item.id}.name`)}</span>
                  <span className={styles.authorRole}>{t(`${item.id}.role`)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}