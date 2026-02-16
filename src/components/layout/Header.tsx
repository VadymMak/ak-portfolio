'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations('hero');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll container (mainContent div)
      const scrollContainer = document.querySelector('[class*="mainContent"]');
      const currentScrollY = scrollContainer?.scrollTop || window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) {
        // Always show at top
        setIsVisible(true);
      } else if (scrollDelta > 5) {
        // Scrolling down — hide
        setIsVisible(false);
      } else if (scrollDelta < -5) {
        // Scrolling up — show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Listen on the mainContent scroll container
    const scrollContainer = document.querySelector('[class*="mainContent"]');
    const target = scrollContainer || window;

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      y: isVisible ? 0 : -100,
      transition: { duration: 0.3, ease: 'easeInOut' },
    });
  }, [isVisible, controls]);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('[class*="mainContent"]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header className={styles.header} animate={controls}>
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
        <h1 className={styles.title}>{t('title')}</h1>
      </div>
    </motion.header>
  );
}