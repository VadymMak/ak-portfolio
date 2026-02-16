'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';

export type Locale = 'en' | 'sk' | 'ru' | 'ua';

export interface LanguageInfo {
  code: Locale;
  label: string;
  nativeLabel: string;
}

export const availableLanguages: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'sk', label: 'Slovenčina', nativeLabel: 'Slovenčina' },
  { code: 'ru', label: 'Русский', nativeLabel: 'Русский' },
  { code: 'ua', label: 'Українська', nativeLabel: 'Українська' },
];

export function useLanguage() {
  const locale = useLocale() as Locale;
  const router = useRouter();

  const changeLanguage = useCallback(
    (code: Locale) => {
      // Set cookie for next-intl to pick up
      document.cookie = `locale=${code}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      // Refresh the page to apply the new locale
      router.refresh();
    },
    [router]
  );

  const getCurrentLanguageLabel = useCallback(() => {
    const lang = availableLanguages.find((l) => l.code === locale);
    return lang?.nativeLabel || 'English';
  }, [locale]);

  return {
    currentLanguage: locale,
    availableLanguages,
    changeLanguage,
    getCurrentLanguageLabel,
  };
}
