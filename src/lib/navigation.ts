'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Cross-navigation hook: scroll to section on home page,
 * navigate + scroll when on blog or other pages
 */
export function useScrollNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isOnBlog = pathname.startsWith('/blog');

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (isHome) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home with hash
        router.push(`/#${sectionId}`);
        // After navigation, scroll to the section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    [isHome, router]
  );

  const navigateToBlog = useCallback(() => {
    router.push('/blog');
  }, [router]);

  return {
    scrollToSection,
    navigateToBlog,
    isHome,
    isOnBlog,
  };
}
