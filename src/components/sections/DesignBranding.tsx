"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import SectionTitle from "../ui/SectionTitle";
import ProtectedImage from "../ui/ProtectedImage";
import styles from "./DesignBranding.module.css";

// 3 best works — one from each category
const showcaseItems = [
  {
    src: "/gallery/labels/label_01.webp",
    alt: "Star Food sunflower oil label design",
    label: "Label Design",
  },
  {
    src: "/gallery/logos/logo_03.webp",
    alt: "Adriano Golf Restaurant logo",
    label: "Logo",
    bgColor: "#1A1A1A",
    isLogo: true,
  },
  {
    src: "/gallery/branding/thumb/thumb_01.webp",
    alt: "Botanical linen tea towel print design",
    label: "Print & Digital",
  },
];

export default function DesignBranding() {
  const t = useTranslations("designBranding");
  const router = useRouter();

  return (
    <section id="design-branding" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle>{t("title")}</SectionTitle>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </motion.div>

      <div className={styles.showcase}>
        {showcaseItems.map((item, index) => (
          <motion.div
            key={index}
            className={`${styles.card} ${item.isLogo ? styles.cardLogo : ""}`}
            style={item.bgColor ? { backgroundColor: item.bgColor } : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => router.push("/design")}
          >
            <ProtectedImage
              src={item.src}
              alt={item.alt}
              className={item.isLogo ? styles.logoImage : styles.image}
            />
            <div className={styles.overlay}>
              <span className={styles.overlayLabel}>{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.ctaWrapper}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <button
          className={styles.ctaButton}
          onClick={() => router.push("/design")}
        >
          {t("viewAll")}
        </button>
      </motion.div>
    </section>
  );
}
