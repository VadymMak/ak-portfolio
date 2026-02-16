import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

import en from '@/locales/en.json';
import sk from '@/locales/sk.json';
import ru from '@/locales/ru.json';
import ua from '@/locales/ua.json';

export const locales = ['en', 'sk', 'ru', 'ua'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const messages: Record<Locale, typeof en> = { en, sk, ru, ua };

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;

  let locale: Locale = defaultLocale;

  if (localeCookie && locales.includes(localeCookie as Locale)) {
    locale = localeCookie as Locale;
  } else {
    const headerStore = await headers();
    const acceptLanguage = headerStore.get('accept-language') || '';

    if (acceptLanguage.includes('uk')) {
      locale = 'ua';
    } else if (acceptLanguage.includes('ru')) {
      locale = 'ru';
    } else if (acceptLanguage.includes('sk')) {
      locale = 'sk';
    }
  }

  return {
    locale,
    messages: messages[locale],
    onError(error) {
      if (error.code === 'MISSING_MESSAGE') return;
      console.error(error);
    },
    getMessageFallback({ key, namespace }) {
      const enMsg = messages['en'] as Record<string, unknown>;
      if (namespace) {
        const ns = enMsg[namespace] as Record<string, string> | undefined;
        return ns?.[key] || `${namespace}.${key}`;
      }
      return (enMsg[key] as string) || key;
    },
  };
});