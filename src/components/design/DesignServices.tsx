"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./DesignServices.module.css";

const services = [
  { icon: "◆", key: "logo" },
  { icon: "◈", key: "brand" },
  { icon: "▣", key: "packaging" },
  { icon: "☰", key: "restaurant" },
  { icon: "⬡", key: "print" },
  { icon: "◎", key: "social" },
];

export default function DesignServices() {
  const t = useTranslations("designPage.services");

  return (
    <section id="design-services" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t("label")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.name}>{t(`${service.key}.name`)}</h3>
              <p className={styles.desc}>{t(`${service.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
