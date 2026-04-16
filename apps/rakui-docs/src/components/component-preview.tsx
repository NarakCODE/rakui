import type { ReactNode } from 'react';
import { ComponentPreviewClient, ComponentPreviewDemoClient } from '@/components/component-preview-client';

export type ComponentPreviewProps = {
  children?: ReactNode;
  className?: string;
  code?: string;
  lang?: string;
  previewClassName?: string;
  title?: string;
  description?: string;
  /** Name of a registered demo component to render */
  name?: string;
};

export async function ComponentPreview({
  children,
  className,
  code,
  lang = 'tsx',
  previewClassName,
  title,
  description,
  name,
}: ComponentPreviewProps) {
  if (name) {
    return (
      <ComponentPreviewDemoClient
        className={className}
        code={code}
        lang={lang}
        name={name}
        previewClassName={previewClassName}
        title={title}
        description={description}
      />
    );
  }

  // Otherwise use the standard code preview
  return (
    <ComponentPreviewClient
      className={className}
      code={code ?? ''}
      lang={lang}
      previewClassName={previewClassName}
      title={title}
      description={description}
    >
      {children}
    </ComponentPreviewClient>
  );
}

export default ComponentPreview;
