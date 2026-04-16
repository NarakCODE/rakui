import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { ComponentPreview } from '@/components/component-preview';
import {
  AutoTypeTable,
  CodeTabs,
  ComponentSource,
  ComponentTabs,
  DataAttributesTable,
  KeyboardShortcutsTable,
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/docs-mdx';
import { PropsTable } from '@/components/props-table';
import { FeedbackBlock } from '@/components/feedback/client';
import { onBlockFeedbackAction } from '@/components/feedback/actions';
import { ActionBarDemo } from '@/components/demos/action-bar-demo';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Fumadocs UI Tabs
    Tabs,
    Tab,
    TabsList,
    TabsTrigger,
    TabsContent,
    // Fumadocs UI Steps
    Steps,
    Step,
    // Fumadocs UI TypeTable
    TypeTable,
    AutoTypeTable,
    CodeTabs,
    ComponentSource,
    ComponentTabs,
    DataAttributesTable,
    KeyboardShortcutsTable,
    // Custom components
    ComponentPreview,
    PropsTable,
    ActionBarDemo,
    FeedbackBlock: ({ children, ...props }) => (
      <FeedbackBlock {...props} onSendAction={onBlockFeedbackAction}>
        {children}
      </FeedbackBlock>
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
