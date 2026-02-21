"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useScrollNavigation } from "@/lib/navigation";
import styles from "./DesignCTA.module.css";

export default function DesignCTA() {
  const t = useTranslations("designPage.cta");
  const { scrollToSection } = useScrollNavigation();

  return (
    <section id="design-contact" className={styles.section}>
      <div className={styles.texture} />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className={styles.title}>
          {t("titlePre")} <em>{t("titleEm")}</em>
        </h2>
        <p className={styles.desc}>{t("description")}</p>
        <button
          onClick={() => scrollToSection("services")}
          className={styles.btn}
        >
          {t("button")}
        </button>
        <div className={styles.details}>
          <span className={styles.detail}>✦ {t("detailConsult")}</span>
          <span className={styles.detail}>✦ {t("detailLocation")}</span>
          <span className={styles.detail}>✦ {t("detailEurope")}</span>
        </div>
      </motion.div>
    </section>
  );
}
