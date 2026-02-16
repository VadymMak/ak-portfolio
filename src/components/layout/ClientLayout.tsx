'use client';

import { useState, useEffect, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import styles from './ClientLayout.module.css';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={styles.layout}>
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      {/* Desktop Menu — right sidebar */}
      <DesktopMenu />

      {/* Mobile Menu — hamburger + fullscreen overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </div>
  );
}
