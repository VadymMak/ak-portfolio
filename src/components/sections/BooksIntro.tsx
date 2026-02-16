'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionTitle from '../ui/SectionTitle';
import styles from './BooksIntro.module.css';

export default function BooksIntro() {
  const t = useTranslations('booksIntro');

  return (
    <section className={styles.section} id="childrens-books">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>{t('title')}</SectionTitle>
      </motion.div>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t('subtitle')}
      </motion.p>
    </section>
  );
}
