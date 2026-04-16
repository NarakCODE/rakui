import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookOpenIcon, LayoutTemplateIcon } from 'lucide-react';
import { appName, gitConfig } from './shared';
import { i18n } from '@/lib/i18n';
import { docsRoute } from '@/lib/shared';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d24b2f] shadow-[0_0_0_4px_rgba(210,75,47,0.12)]" />
          <span className="flex items-baseline gap-2">
            <span className="font-semibold uppercase tracking-[0.24em] text-[0.72rem] text-fd-muted-foreground">
              {appName}
            </span>
            <span className="font-serif text-base italic text-fd-foreground">docs</span>
          </span>
        </span>
      ),
      url: `/${locale}`,
      transparentMode: 'top',
    },
    links: [
      {
        icon: <BookOpenIcon />,
        text: 'Docs',
        url: `/${locale}${docsRoute}`,
        active: 'nested-url',
      },
      {
        icon: <LayoutTemplateIcon />,
        text: 'Templates',
        url: `/${locale}/templates`,
        active: 'nested-url',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n,
  };
}
