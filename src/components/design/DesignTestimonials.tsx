'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './DesignTestimonials.module.css';

const clients = ['starfood', 'baloonparty', 'lasercraft'];

export default function DesignTestimonials() {
  const t = useTranslations('designPage.testimonials');

  return (
    <section id="design-testimonials" className={styles.section}>
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

        <div className={styles.grid}>
          {clients.map((client, i) => (
            <motion.div
              key={client}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className={styles.quote}>&ldquo;</span>
              <p className={styles.text}>{t(`${client}.text`)}</p>
              <div className={styles.divider} />
              <p className={styles.author}>{t(`${client}.author`)}</p>
              <p className={styles.role}>{t(`${client}.role`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
