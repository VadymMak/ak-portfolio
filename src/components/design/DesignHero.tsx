'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './DesignHero.module.css';

export default function DesignHero() {
  const t = useTranslations('designPage.hero');

  return (
    <section className={styles.hero}>
      <div className={styles.texture} />
      <div className={styles.content}>
        <div className={styles.textSide}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('label')}
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {t('titlePre')} <em>{t('titleEm')}</em>
          </motion.h1>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {t('description')}
          </motion.p>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNum}>30+</span>
              <span className={styles.statLabel}>{t('statProjects')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>5+</span>
              <span className={styles.statLabel}>{t('statYears')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>{t('statSatisfaction')}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.cardsSide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={`${styles.floatCard} ${styles.card1}`}>
            <span className={styles.cardIcon}>🏷️</span>
            <span className={styles.cardName}>Star Food</span>
            <span className={styles.cardType}>{t('cardLabels')}</span>
          </div>
          <div className={`${styles.floatCard} ${styles.card2}`}>
            <span className={styles.cardIcon}>🍽️</span>
            <span className={styles.cardName}>Andriano</span>
            <span className={styles.cardType}>{t('cardRestaurant')}</span>
          </div>
          <div className={`${styles.floatCard} ${styles.card3}`}>
            <span className={styles.cardIcon}>🎈</span>
            <span className={styles.cardName}>Baloon Party</span>
            <span className={styles.cardType}>{t('cardBrandbook')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
