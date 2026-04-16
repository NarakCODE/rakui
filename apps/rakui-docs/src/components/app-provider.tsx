'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { i18n } from '@/lib/i18n';
import { suppressFumadocsWarning } from '@/lib/suppress-fumadocs-warning';

if (typeof window !== 'undefined') {
  suppressFumadocsWarning();
}

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: 'English',
    },
    km: {
      displayName: 'ភាសាខ្មែរ',
      search: 'ស្វែងរកឯកសារ',
    },
  },
});

function getLocaleFromPathname(pathname: string | null) {
  const segment = pathname?.split('/').filter(Boolean)[0];
  const languages = i18n.languages as readonly string[];

  if (segment && languages.includes(segment)) {
    return segment as (typeof i18n.languages)[number];
  }

  return i18n.defaultLanguage;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <RootProvider
      theme={{
        attribute: 'class',
        defaultTheme: 'system',
        enableSystem: true,
        disableTransitionOnChange: true,
      }}
      i18n={provider(locale)}
    >
      {children}
    </RootProvider>
  );
}
