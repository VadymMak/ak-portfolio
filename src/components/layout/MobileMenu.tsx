'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/lib/language';
import { useScrollNavigation } from '@/lib/navigation';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isChildrensOpen, setIsChildrensOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { currentLanguage, availableLanguages, changeLanguage, getCurrentLanguageLabel } =
    useLanguage();
  const t = useTranslations();
  const { scrollToSection: scrollTo, navigateToBlog, isOnBlog } = useScrollNavigation();

  // Book projects with translations
  const bookProjects = [
    { id: 'nutcracker', title: t('books.nutcracker') },
    { id: 'wild-swans', title: t('books.wildSwans') },
    { id: 'winter-adventures', title: t('books.winterAdventures') },
    { id: 'magic-world', title: t('books.magicWorld') },
    { id: 'sigurd', title: t('books.sigurd') },
    { id: 'secrets-sea', title: t('books.seaSecrets') },
  ];

  // Scroll to section with menu close delay
  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => scrollTo(id), 300);
  };

  const handleBlogClick = () => {
    onClose();
    setTimeout(() => navigateToBlog(), 300);
  };

  const handleLanguageChange = (code: string) => {
    changeLanguage(code as 'en' | 'sk' | 'ru' | 'ua');
    setIsLanguageOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={onClose} className={styles.menuButton} aria-label="Toggle menu">
        <div className={styles.hamburger}>
          <motion.span
            className={styles.hamburgerLine}
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className={styles.hamburgerLine}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className={styles.hamburgerLine}
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </div>
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={`${styles.menuPanel} ${isOpen ? styles.open : ''}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{ display: 'flex' }}
          >
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
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <button
                  onClick={() => scrollToSection('about')}
                  className={styles.menuItemButton}
                >
                  {t('menu.aboutMe')}
                </button>
              </motion.li>

              {/* Children's Books with Accordion */}
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <button
                  onClick={() => setIsChildrensOpen(!isChildrensOpen)}
                  className={styles.menuItemButton}
                >
                  {isChildrensOpen ? '▼' : '►'} {t('menu.childrensBooks')}
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
              </motion.li>

              {/* Design & Branding */}
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={() => scrollToSection('design-branding')}
                  className={styles.menuItemButton}
                >
                  {t('menu.designBranding')}
                </button>
              </motion.li>

              {/* Testimonials */}
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className={styles.menuItemButton}
                >
                  {t('menu.testimonials')}
                </button>
              </motion.li>

              {/* Blog */}
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
              >
                <button
                  onClick={handleBlogClick}
                  className={`${styles.menuItemButton} ${isOnBlog ? styles.active : ''}`}
                >
                  {t('menu.blog')}
                </button>
              </motion.li>

              {/* Services */}
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => scrollToSection('services')}
                  className={styles.menuItemButton}
                >
                  {t('menu.services')}
                </button>
              </motion.li>

              {/* Contact */}
              <motion.li
                className={styles.menuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className={styles.menuItemButton}
                >
                  {t('menu.contactMe')}
                </button>
              </motion.li>
            </ul>

            {/* Contact Block */}
            <motion.div
              className={styles.contactBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
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
                >
                  Behance
                </a>
                <a
                  href="https://www.instagram.com/akolesnyk.sketch?igsh=eTgyYnNrZnVneDRy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
