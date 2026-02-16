'use client';

import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.container}>
        {/* Copyright */}
        <p className={styles.copyright}>
          &copy; 2024&ndash;2026 Anastasiia Kolisnyk
        </p>

        {/* Contact Links */}
        <div className={styles.links}>
          <a href="mailto:akolesnykl989@gmail.com" className={styles.link}>
            akolesnykl989@gmail.com
          </a>

          <a
            href="https://wa.me/qr/A3NYYPE55OODK1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            WhatsApp
          </a>

          <a
            href="https://www.behance.net/akolesnyk14bf8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Behance
          </a>

          <a
            href="https://www.instagram.com/akolesnyk.sketch?igsh=eTgyYnNrZnVneDRy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Instagram
          </a>
        </div>

        {/* Logo */}
        <div className={styles.logo}>AK</div>
      </div>

      {/* Copyright Protection Notice */}
      <div className={styles.copyrightNotice}>
        <p className={styles.copyrightText}>{t('copyright')}</p>
      </div>
    </footer>
  );
}
