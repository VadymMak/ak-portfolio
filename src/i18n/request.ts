import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

// Supported locales matching current site
export const locales = ['en', 'sk', 'ru', 'ua'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async () => {
  // Get locale from cookie (set by language switcher)
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;

  // Fallback: detect from Accept-Language header
  let locale: Locale = defaultLocale;

  if (localeCookie && locales.includes(localeCookie as Locale)) {
    locale = localeCookie as Locale;
  } else {
    const headerStore = await headers();
    const acceptLanguage = headerStore.get('accept-language') || '';

    // Geo-restriction logic: detect UA/RU regions
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
    messages: (await import(`@/locales/${locale}.json`)).default,
  };
});
