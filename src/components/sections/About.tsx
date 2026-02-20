"use client";

import { useTranslations } from "next-intl";
import SectionTitle from "../ui/SectionTitle";
import ProtectedImage from "../ui/ProtectedImage";
import styles from "./About.module.css";

export default function About() {
  const t = useTranslations("about");

  const renderIntro = t.rich("intro", {
    name: (chunks: React.ReactNode) => (
      <strong className={styles.name}>{chunks}</strong>
    ),
  });

  return (
    <section id="about" className={styles.section}>
      {/* ========== DESKTOP VERSION ========== */}
      <div className={styles.desktopContainer}>
        <div className={styles.imageWrapper}>
          <ProtectedImage
            src="/gallery/about/about-me_empty.webp"
            alt="About Me"
            className={styles.aboutImage}
          />

          <div className={styles.textOverlay}>
            <div className={styles.textContent}>
              <p className={styles.paragraph}>{renderIntro}</p>
              <p className={styles.paragraph}>{t("work")}</p>
              <p className={styles.paragraph}>{t("goal")}</p>
              <p className={styles.paragraph}>{t("explore")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE VERSION ========== */}
      <div className={styles.mobileContainer}>
        {/* Portrait Image */}
        <div className={styles.mobileImageWrapper}>
          <ProtectedImage
            src="/gallery/about/about-photo.webp"
            alt="Anastasiia Kolisnyk"
            className={styles.mobileImage}
          />
        </div>

        {/* Text Content */}
        <div className={styles.mobileTextWrapper}>
          <div className={styles.mobileTitleWrapper}>
            <SectionTitle>About Me</SectionTitle>
          </div>

          <div className={styles.mobileDescription}>
            <p className={styles.mobileText}>{renderIntro}</p>
            <p className={styles.mobileText}>{t("work")}</p>
            <p className={styles.mobileText}>{t("goal")}</p>
            <p className={styles.mobileText}>{t("explore")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
