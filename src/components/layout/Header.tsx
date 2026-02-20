"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/ui/ThemeToggle";
import styles from "./Header.module.css";

const SCROLL_THRESHOLD = 15;

export default function Header() {
  const t = useTranslations("hero");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateHeader = useCallback(() => {
    const scrollContainer = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    const currentScrollY = scrollContainer?.scrollTop ?? window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY.current;

    if (currentScrollY < 80) {
      setIsVisible(true);
    } else if (scrollDelta > SCROLL_THRESHOLD) {
      setIsVisible(false);
    } else if (scrollDelta < -SCROLL_THRESHOLD) {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(updateHeader);
    };

    const scrollContainer = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    const target = scrollContainer || window;

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [updateHeader]);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(
      '[class*="mainContent"]',
    ) as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`${styles.header} ${isVisible ? "" : styles.headerHidden}`}
    >
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
        <h1 className={styles.title}>{t("title")}</h1>
      </div>
      {/* Theme Toggle - Right */}
      <ThemeToggle />
    </header>
  );
}
