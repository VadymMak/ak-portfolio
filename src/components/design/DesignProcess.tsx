'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './DesignProcess.module.css';

const steps = ['brief', 'concepts', 'refinement', 'delivery'];

export default function DesignProcess() {
  const t = useTranslations('designPage.process');

  return (
    <section id="design-process" className={styles.section}>
      <div className={styles.texture} />
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
          {steps.map((step, i) => (
            <motion.div
              key={step}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className={styles.num}>0{i + 1}</span>
              <h3 className={styles.stepTitle}>{t(`${step}.name`)}</h3>
              <p className={styles.stepDesc}>{t(`${step}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
