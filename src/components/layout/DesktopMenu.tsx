'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/language';
import { useScrollNavigation } from '@/lib/navigation';
import styles from './DesktopMenu.module.css';

export default function DesktopMenu() {
  const [isChildrensOpen, setIsChildrensOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { currentLanguage, availableLanguages, changeLanguage, getCurrentLanguageLabel } =
    useLanguage();
  const t = useTranslations();
  const { scrollToSection, navigateToBlog, navigateToDesign, isOnBlog, isOnDesign } = useScrollNavigation();

  // Book projects with translations
  const bookProjects = [
    { id: 'nutcracker', title: t('books.nutcracker') },
    { id: 'wild-swans', title: t('books.wildSwans') },
    { id: 'winter-adventures', title: t('books.winterAdventures') },
    { id: 'magic-world', title: t('books.magicWorld') },
    { id: 'sigurd', title: t('books.sigurd') },
    { id: 'secrets-sea', title: t('books.seaSecrets') },
  ];

  const handleLanguageChange = (code: string) => {
    changeLanguage(code as 'en' | 'sk' | 'ru' | 'ua');
    setIsLanguageOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {/* Language Switcher */}
        <div className={styles.languageSection}>
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className={styles.languageButton}
          >
            <span>{isLanguageOpen ? '▼' : '►'}</span>
            <span>{getCurrentLanguageLabel()}</span>
          </button>

          <AnimatePresence>
            {isLanguageOpen && (
              <motion.ul
                className={styles.languageList}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {availableLanguages
                  .filter((lang) => lang.code !== currentLanguage)
                  .map((lang) => (
                    <li key={lang.code} className={styles.languageItem}>
                      <button
                        onClick={() => handleLanguageChange(lang.code)}
                        className={styles.languageOption}
                      >
                        {lang.nativeLabel}
                      </button>
                    </li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <ul className={styles.menuList}>
          {/* About Me */}
          <li className={styles.menuItem}>
            <button onClick={() => scrollToSection('about')} className={styles.menuButton}>
              {t('menu.aboutMe')}
            </button>
          </li>

          {/* Children's Book Illustrations - Accordion */}
          <li className={styles.menuItem}>
            <button
              onClick={() => setIsChildrensOpen(!isChildrensOpen)}
              className={styles.menuButton}
            >
              <span>{isChildrensOpen ? '▼' : '►'}</span>
              <span>{t('menu.childrensBooks')}</span>
            </button>

            <AnimatePresence>
              {isChildrensOpen && (
                <motion.ul
                  className={styles.submenu}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {bookProjects.map((project) => (
                    <li key={project.id} className={styles.submenuItem}>
                      <button
                        onClick={() => scrollToSection(project.id)}
                        className={styles.submenuButton}
                      >
                        {project.title}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Design & Branding — now navigates to /design page */}
          <li className={styles.menuItem}>
            <button
              onClick={navigateToDesign}
              className={`${styles.menuButton} ${isOnDesign ? styles.active : ''}`}
            >
              {t('menu.designBranding')}
            </button>
          </li>

          {/* Testimonials */}
          <li className={styles.menuItem}>
            <button
              onClick={() => scrollToSection('testimonials')}
              className={styles.menuButton}
            >
              {t('menu.testimonials')}
            </button>
          </li>

          {/* Blog — navigates to /blog page */}
          <li className={styles.menuItem}>
            <button
              onClick={navigateToBlog}
              className={`${styles.menuButton} ${isOnBlog ? styles.active : ''}`}
            >
              {t('menu.blog')}
            </button>
          </li>

          {/* Services */}
          <li className={styles.menuItem}>
            <button
              onClick={() => scrollToSection('services')}
              className={styles.menuButton}
            >
              {t('menu.services')}
            </button>
          </li>

          {/* Contact */}
          <li className={styles.menuItem}>
            <button
              onClick={() => scrollToSection('footer')}
              className={styles.menuButton}
            >
              {t('menu.contactMe')}
            </button>
          </li>
        </ul>

        {/* Contact Block */}
        <div className={styles.contactBlock}>
          <a href="mailto:akolesnykl989@gmail.com" className={styles.contactLink}>
            akolesnykl989@gmail.com
          </a>

          <a
            href="https://wa.me/qr/A3NYYPE55OODK1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            <span className={styles.contactLabel}>WhatsApp:</span> +421 951 813 809
          </a>

          <div className={styles.socialLinks}>
            <a
              href="https://www.behance.net/akolesnyk14bf8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Behance"
            >
              Behance
            </a>
            <a
              href="https://www.instagram.com/akolesnyk.sketch?igsh=eTgyYnNrZnVneDRy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
