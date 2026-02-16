'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations('hero');

  const scrollToTop = () => {
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo - Left */}
      <button onClick={scrollToTop} className={styles.logoButton}>
        <motion.div
          className={styles.logoCircle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.logoText}>AK</span>
        </motion.div>
      </button>

      {/* Title - Centered */}
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          {t('title')}
        </h1>
      </div>
    </header>
  );
}
