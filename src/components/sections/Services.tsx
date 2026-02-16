'use client';

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionTitle from '../ui/SectionTitle';
import styles from './Services.module.css';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lfe3WUsAAAAACOFaxYNt26KZB8FzYOwKVAphlKG';

// ========== SERVICE ICONS ==========

interface ServiceItem {
  id: string;
  icon: ReactNode;
}

const services: ServiceItem[] = [
  {
    id: 'book',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6h14v36H8a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" />
        <path d="M22 6h14a2 2 0 012 2v32a2 2 0 01-2 2H22V6z" stroke="currentColor" strokeWidth="2" />
        <path d="M22 6v36" stroke="currentColor" strokeWidth="2" />
        <path d="M12 14h4M12 20h4M28 14h6M28 20h6M28 26h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'cover',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="4" width="28" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M16 34h16M20 38h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 4h28v8H10z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'character',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 12l4-4M34 12l-2-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'label',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10a2 2 0 012-2h28a2 2 0 012 2v28a2 2 0 01-2 2H10a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="22" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M14 34h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 14v-2M24 32v2M32 22h2M14 22h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'logo',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6l18 32H6L24 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M24 22v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'branding',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="12" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16h8M10 22h8M10 28h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 18h8M32 24h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ========== COMPONENT ==========

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  timeline: string;
  referral: string;
  honeypot: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  projectType: '',
  description: '',
  timeline: '',
  referral: '',
  honeypot: '',
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export default function Services() {
  const t = useTranslations('services');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const scrollToForm = () => {
    const form = document.getElementById('contact-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setFormStatus('sending');

    try {
      let recaptchaToken = '';
      if (window.grecaptcha && RECAPTCHA_SITE_KEY) {
        try {
          recaptchaToken = await Promise.race([
            new Promise<string>((resolve) => {
              window.grecaptcha!.ready(() => {
                window.grecaptcha!
                  .execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
                  .then(resolve)
                  .catch(() => resolve(''));
              });
            }),
            new Promise<string>((resolve) => setTimeout(() => resolve(''), 3000)),
          ]);
        } catch {
          console.warn('reCAPTCHA failed, submitting without it');
        }
      }

      const submitData = new URLSearchParams();
      submitData.append('form-name', 'contact');
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('projectType', formData.projectType);
      submitData.append('description', formData.description);
      submitData.append('timeline', formData.timeline);
      submitData.append('referral', formData.referral);
      if (recaptchaToken) submitData.append('g-recaptcha-response', recaptchaToken);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submitData.toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData(initialFormData);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="services" className={styles.section}>
      {/* ===== SERVICES CARDS ===== */}
      <div className={styles.servicesBlock}>
        <div className={styles.header}>
          <motion.div
            className={styles.titleWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle>{t('title')}</SectionTitle>
          </motion.div>

          <motion.div
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className={styles.descriptionText}>{t('intro')}</p>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={styles.cardIcon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{t(`${service.id}.title`)}</h3>
              <p className={styles.cardDesc}>{t(`${service.id}.desc`)}</p>
              <button className={styles.cardButton} onClick={scrollToForm}>
                {t('inquire')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===== CONTACT FORM ===== */}
      <div id="contact-form" className={styles.formBlock}>
        <motion.div
          className={styles.formHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.formTitle}>{t('form.title')}</h2>
          <p className={styles.formSubtitle}>{t('form.subtitle')}</p>
        </motion.div>

        {formStatus === 'success' ? (
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>{t('form.successTitle')}</h3>
            <p className={styles.successText}>{t('form.successText')}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }}>
                <label>
                  Don&apos;t fill this out:
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">{t('form.name')} *</label>
                  <input
                    type="text" id="name" name="name"
                    className={styles.formInput}
                    value={formData.name} onChange={handleChange}
                    required placeholder={t('form.namePlaceholder')}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">{t('form.email')} *</label>
                  <input
                    type="email" id="email" name="email"
                    className={styles.formInput}
                    value={formData.email} onChange={handleChange}
                    required placeholder={t('form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="projectType">{t('form.projectType')} *</label>
                  <select
                    id="projectType" name="projectType"
                    className={styles.formSelect}
                    value={formData.projectType} onChange={handleChange}
                    required
                  >
                    <option value="">{t('form.selectProject')}</option>
                    <option value="book">{t('book.title')}</option>
                    <option value="cover">{t('cover.title')}</option>
                    <option value="character">{t('character.title')}</option>
                    <option value="label">{t('label.title')}</option>
                    <option value="logo">{t('logo.title')}</option>
                    <option value="branding">{t('branding.title')}</option>
                    <option value="other">{t('form.other')}</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="timeline">{t('form.timeline')}</label>
                  <select
                    id="timeline" name="timeline"
                    className={styles.formSelect}
                    value={formData.timeline} onChange={handleChange}
                  >
                    <option value="">{t('form.selectTimeline')}</option>
                    <option value="less-1">{t('form.less1')}</option>
                    <option value="1-3">{t('form.months13')}</option>
                    <option value="3-6">{t('form.months36')}</option>
                    <option value="flexible">{t('form.flexible')}</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="description">{t('form.description')} *</label>
                <textarea
                  id="description" name="description"
                  className={styles.formTextarea}
                  value={formData.description} onChange={handleChange}
                  required rows={5} placeholder={t('form.descriptionPlaceholder')}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="referral">{t('form.referral')}</label>
                <select
                  id="referral" name="referral"
                  className={styles.formSelect}
                  value={formData.referral} onChange={handleChange}
                >
                  <option value="">{t('form.selectReferral')}</option>
                  <option value="instagram">Instagram</option>
                  <option value="behance">Behance</option>
                  <option value="google">Google Search</option>
                  <option value="referral">{t('form.referralOption')}</option>
                  <option value="other">{t('form.other')}</option>
                </select>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? t('form.sending') : t('form.submit')}
              </button>

              {formStatus === 'error' && (
                <p className={styles.errorMessage}>{t('form.error')}</p>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}