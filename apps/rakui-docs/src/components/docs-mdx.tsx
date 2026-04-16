import { promises as fs } from "node:fs";
import path from "node:path";
import type * as React from "react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import {
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "fumadocs-ui/components/tabs";
import { ComponentPreview } from "@/components/component-preview";
import { PropsTable, type PropDef } from "@/components/props-table";
import { typeInfo as angleSliderTypeInfo } from "../../types/radix/angle-slider";
import { typeInfo as bannerTypeInfo } from "../../types/radix/banner";
import { typeInfo as badgeOverflowTypeInfo } from "../../types/radix/badge-overflow";
import { typeInfo as kanbanTypeInfo } from "../../types/radix/kanban";
import { typeInfo as mentionTypeInfo } from "../../types/radix/mention";
import { typeInfo as sortableTypeInfo } from "../../types/radix/sortable";
import { typeInfo as timelineTypeInfo } from "../../types/radix/timeline";

const componentSources = {
  "compose-refs": "src/lib/compose-refs.ts",
  "visually-hidden-input": "src/components/visually-hidden-input.tsx",
  "use-isomorphic-layout-effect": "src/hooks/use-isomorphic-layout-effect.ts",
  "use-lazy-ref": "src/hooks/use-lazy-ref.ts",
  "angle-slider": "src/components/ui/angle-slider.tsx",
  banner: "src/components/ui/banner.tsx",
  "avatar-group": "src/components/ui/avatar-group.tsx",
  "use-as-ref": "src/hooks/use-as-ref.ts",
  "badge-overflow": "src/components/ui/badge-overflow.tsx",
  "action-bar": "src/components/ui/action-bar.tsx",
  "button-group": "src/components/ui/button-group.tsx",
  "circular-progress": "src/components/ui/circular-progress.tsx",
  combobox: "src/components/ui/combobox.tsx",
  "phone-input": "src/components/ui/phone-input.tsx",
  tour: "src/components/ui/tour.tsx",
  kanban: "src/components/ui/kanban.tsx",
  listbox: "src/components/ui/listbox.tsx",
  marquee: "src/components/ui/marquee.tsx",
  "mask-input": "src/components/ui/mask-input.tsx",
  masonry: "src/components/ui/masonry.tsx",
  mention: "src/components/ui/mention.tsx",
  stat: "src/components/ui/stat.tsx",
  status: "src/components/ui/status.tsx",
  stack: "src/components/ui/stack.tsx",
  sortable: "src/components/ui/sortable.tsx",
  "segmented-input": "src/components/ui/segmented-input.tsx",
  "tags-input": "src/components/ui/tags-input.tsx",
  swap: "src/components/ui/swap.tsx",
  card: "src/components/ui/card.tsx",
  "data-grid": "src/components/ui/data-grid.tsx",
  "use-data-grid": "src/hooks/use-data-grid.tsx",
  "data-grid-keyboard-shortcuts": "src/components/data-grid/data-grid-keyboard-shortcuts.tsx",
  timeline: "src/components/ui/timeline.tsx",
  stepper: "src/components/ui/stepper.tsx",
  "compare-slider": "src/components/ui/compare-slider.tsx",
  "selection-toolbar": "src/components/ui/selection-toolbar.tsx",
  "speed-dial": "src/components/ui/speed-dial.tsx",
  button: "src/components/ui/button.tsx",
  meter: "src/components/ui/meter.tsx",
} as const;

const componentDemos = {
  "action-bar-demo": "src/components/demos/action-bar-demo.tsx",
  "button-demo": "src/components/demos/button-demo.tsx",
  "button-group-demo": "src/components/demos/button-group-demo.tsx",
  "button-group-disabled": "src/components/demos/button-group-disabled.tsx",
  "button-group-full-width": "src/components/demos/button-group-full-width.tsx",
  "button-group-orientation":
    "src/components/demos/button-group-orientation.tsx",
  "button-group-variants": "src/components/demos/button-group-variants.tsx",
  "button-group-sizes": "src/components/demos/button-group-sizes.tsx",
  "button-group-with-icons": "src/components/demos/button-group-with-icons.tsx",
  "angle-slider-demo": "src/components/demos/angle-slider-demo.tsx",
  "angle-slider-controlled-demo":
    "src/components/demos/angle-slider-controlled-demo.tsx",
  "angle-slider-range-demo": "src/components/demos/angle-slider-range-demo.tsx",
  "angle-slider-themes-demo":
    "src/components/demos/angle-slider-themes-demo.tsx",
  "angle-slider-form-demo": "src/components/demos/angle-slider-form-demo.tsx",
  "banner-demo": "src/components/demos/banner-demo.tsx",
  "avatar-group-demo": "src/components/demos/avatar-group-demo.tsx",
  "avatar-group-truncation-demo":
    "src/components/demos/avatar-group-truncation-demo.tsx",
  "avatar-group-rtl-demo": "src/components/demos/avatar-group-rtl-demo.tsx",
  "avatar-group-icons-demo": "src/components/demos/avatar-group-icons-demo.tsx",
  "avatar-group-custom-overflow-demo":
    "src/components/demos/avatar-group-custom-overflow-demo.tsx",
  "badge-overflow-demo": "src/components/demos/badge-overflow-demo.tsx",
  "badge-overflow-truncation-demo":
    "src/components/demos/badge-overflow-truncation-demo.tsx",
  "badge-overflow-variants-demo":
    "src/components/demos/badge-overflow-variants-demo.tsx",
  "badge-overflow-custom-overflow-demo":
    "src/components/demos/badge-overflow-custom-overflow-demo.tsx",
  "badge-overflow-multiline-demo":
    "src/components/demos/badge-overflow-multiline-demo.tsx",
  "badge-overflow-interactive-demo":
    "src/components/demos/badge-overflow-interactive-demo.tsx",
  "checkbox-group-demo": "src/components/demos/checkbox-group-demo.tsx",
  "checkbox-group-horizontal-demo":
    "src/components/demos/checkbox-group-horizontal-demo.tsx",
  "checkbox-group-validation-demo":
    "src/components/demos/checkbox-group-validation-demo.tsx",
  "checkbox-group-multi-selection-demo":
    "src/components/demos/checkbox-group-multi-selection-demo.tsx",
  "combobox-demo": "src/components/demos/combobox-demo.tsx",
  "circular-progress-demo": "src/components/demos/circular-progress-demo.tsx",
  "circular-progress-controlled-demo":
    "src/components/demos/circular-progress-controlled-demo.tsx",
  "circular-progress-colors-demo":
    "src/components/demos/circular-progress-colors-demo.tsx",
  "compare-slider-demo": "src/components/demos/compare-slider-demo.tsx",
  "compare-slider-controlled-demo":
    "src/components/demos/compare-slider-controlled-demo.tsx",
  "compare-slider-vertical-demo":
    "src/components/demos/compare-slider-vertical-demo.tsx",
  "compare-slider-custom-demo":
    "src/components/demos/compare-slider-custom-demo.tsx",
  "compare-slider-hover-demo":
    "src/components/demos/compare-slider-hover-demo.tsx",
  "data-grid-demo": "src/components/demos/data-grid-demo.tsx",
  "kanban-demo": "src/components/demos/kanban-demo.tsx",
  "kanban-dynamic-overlay-demo": "src/components/demos/kanban-dynamic-overlay-demo.tsx",
  "listbox-demo": "src/components/demos/listbox-demo.tsx",
  "listbox-horizontal-demo": "src/components/demos/listbox-horizontal-demo.tsx",
  "listbox-grid-demo": "src/components/demos/listbox-grid-demo.tsx",
  "listbox-group-demo": "src/components/demos/listbox-group-demo.tsx",
  "marquee-demo": "src/components/demos/marquee-demo.tsx",
  "marquee-logo-demo": "src/components/demos/marquee-logo-demo.tsx",
  "marquee-vertical-demo": "src/components/demos/marquee-vertical-demo.tsx",
  "marquee-rtl-demo": "src/components/demos/marquee-rtl-demo.tsx",
  "masonry-demo": "src/components/demos/masonry-demo.tsx",
  "masonry-linear-demo": "src/components/demos/masonry-linear-demo.tsx",
  "masonry-ssr-demo": "src/components/demos/masonry-ssr-demo.tsx",
  "mask-input-demo": "src/components/demos/mask-input-demo.tsx",
  "mask-input-custom-pattern-demo": "src/components/demos/mask-input-custom-pattern-demo.tsx",
  "mention-demo": "src/components/demos/mention-demo.tsx",
  "sortable-demo": "src/components/demos/sortable-demo.tsx",
  "sortable-horizontal-demo":
    "src/components/demos/sortable-horizontal-demo.tsx",
  "sortable-with-handle-demo":
    "src/components/demos/sortable-with-handle-demo.tsx",
  "sortable-primitive-values-demo":
    "src/components/demos/sortable-primitive-values-demo.tsx",
  "timeline-alternate-demo": "src/components/demos/timeline-alternate-demo.tsx",
  "timeline-custom-dot-demo": "src/components/demos/timeline-custom-dot-demo.tsx",
  "timeline-horizontal-demo": "src/components/demos/timeline-horizontal-demo.tsx",
  "timeline-rtl-demo": "src/components/demos/timeline-rtl-demo.tsx",
  "timeline-demo": "src/components/demos/timeline-demo.tsx",
  "stepper-demo": "src/components/demos/stepper-demo.tsx",
  "stepper-vertical-demo": "src/components/demos/stepper-vertical-demo.tsx",
  "stepper-validation-demo": "src/components/demos/stepper-validation-demo.tsx",
  "stepper-form-demo": "src/components/demos/stepper-form-demo.tsx",
  "selection-toolbar-demo": "src/components/demos/selection-toolbar-demo.tsx",
  "selection-toolbar-info-demo":
    "src/components/demos/selection-toolbar-info-demo.tsx",
  "tour-demo": "src/components/demos/tour-demo.tsx",
  "swap-demo": "src/components/demos/swap-demo.tsx",
  "swap-rotate-demo": "src/components/demos/swap-rotate-demo.tsx",
  "swap-flip-demo": "src/components/demos/swap-flip-demo.tsx",
  "swap-scale-demo": "src/components/demos/swap-scale-demo.tsx",
  "swap-hover-demo": "src/components/demos/swap-hover-demo.tsx",
  "swap-controlled-demo": "src/components/demos/swap-controlled-demo.tsx",
  "swap-animations-demo": "src/components/demos/swap-animations-demo.tsx",
  "stat-demo": "src/components/demos/stat-demo.tsx",
  "stat-indicator-demo": "src/components/demos/stat-indicator-demo.tsx",
  "status-demo": "src/components/demos/status-demo.tsx",
  "status-variants-demo": "src/components/demos/status-variants-demo.tsx",
  "status-text-only-demo": "src/components/demos/status-text-only-demo.tsx",
  "status-list-demo": "src/components/demos/status-list-demo.tsx",
  "card-demo": "src/components/demos/card-demo.tsx",
  "card-variants-demo": "src/components/demos/card-variants-demo.tsx",
  "card-horizontal-demo": "src/components/demos/card-horizontal-demo.tsx",
  "card-with-avatar-demo": "src/components/demos/card-with-avatar-demo.tsx",
  "card-with-image-demo": "src/components/demos/card-with-image-demo.tsx",
  "card-with-form-demo": "src/components/demos/card-with-form-demo.tsx",
  "stack-demo": "src/components/demos/stack-demo.tsx",
  "stack-without-expansion-demo": "src/components/demos/stack-without-expansion-demo.tsx",
  "stack-side-demo": "src/components/demos/stack-side-demo.tsx",
  "tags-input-demo": "src/components/demos/tags-input-demo.tsx",
  "tags-input-editable-demo": "src/components/demos/tags-input-editable-demo.tsx",
  "tags-input-validation-demo": "src/components/demos/tags-input-validation-demo.tsx",
  "tags-input-sortable-demo": "src/components/demos/tags-input-sortable-demo.tsx",
  "segmented-input-demo": "src/components/demos/segmented-input-demo.tsx",
  "segmented-input-form-demo": "src/components/demos/segmented-input-form-demo.tsx",
  "segmented-input-rgb-demo": "src/components/demos/segmented-input-rgb-demo.tsx",
  "segmented-input-vertical-demo": "src/components/demos/segmented-input-vertical-demo.tsx",
  "speed-dial-demo": "src/components/demos/speed-dial-demo.tsx",
  "speed-dial-labels-demo": "src/components/demos/speed-dial-labels-demo.tsx",
  "speed-dial-hover-demo": "src/components/demos/speed-dial-hover-demo.tsx",
  "speed-dial-controlled-demo": "src/components/demos/speed-dial-controlled-demo.tsx",
  "speed-dial-side-demo": "src/components/demos/speed-dial-side-demo.tsx",
  "speed-dial-fixed-demo": "src/components/demos/speed-dial-fixed-demo.tsx",
  "phone-input-demo": "src/components/demos/phone-input-demo.tsx",
  "meter-demo": "src/components/demos/meter-demo.tsx",
  "dashboard-template-demo": "src/components/demos/dashboard-template-demo.tsx",
} as const;

const typeModules = {
  "./types/radix/angle-slider.ts": angleSliderTypeInfo,
  "./types/radix/banner.ts": bannerTypeInfo,
  "./types/radix/badge-overflow.ts": badgeOverflowTypeInfo,
  "./types/radix/kanban.ts": kanbanTypeInfo,
  "./types/radix/mention.ts": mentionTypeInfo,
  "./types/radix/sortable.ts": sortableTypeInfo,
  "./types/radix/timeline.ts": timelineTypeInfo,
} as const;

type AttributeRow = {
  title: string;
  value: string;
};

type ShortcutRow = {
  keys: string[];
  description: string;
};

function getLanguage(filePath: string) {
  const ext = path.extname(filePath).slice(1);
  if (ext === "mdx") return "mdx";
  if (ext === "ts" || ext === "tsx") return ext;
  return "txt";
}

async function readProjectFile(filePath: string) {
  const absolutePath = path.join(process.cwd(), filePath);
  return fs.readFile(absolutePath, "utf8");
}

export async function ComponentTabs({
  name,
}: {
  name: keyof typeof componentDemos;
}) {
  const demoPath = componentDemos[name];
  
  if (!demoPath) {
    throw new Error(`Demo "${name}" not found in componentDemos registry. Make sure to add it to src/components/docs-mdx.tsx`);
  }
  
  const code = await readProjectFile(demoPath);

  return <ComponentPreview code={code} lang="tsx" name={name} />;
}

export function CodeTabs(props: React.ComponentProps<typeof Tabs>) {
  return <Tabs {...props} />;
}

export async function ComponentSource({
  name,
  title,
}: {
  name: keyof typeof componentSources;
  title?: string;
}) {
  const sourcePath = componentSources[name];
  const code = await readProjectFile(sourcePath);

  return (
    <DynamicCodeBlock
      code={code}
      lang={getLanguage(sourcePath)}
      codeblock={{ title: title ?? sourcePath }}
    />
  );
}

export async function AutoTypeTable({
  path: modulePath,
  name,
}: {
  path: keyof typeof typeModules;
  name: string;
}) {
  const props = (typeModules[modulePath]?.[name] ?? []) as PropDef[];

  return <PropsTable props={props} />;
}

export function DataAttributesTable({ data }: { data: AttributeRow[] }) {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-fd-muted/50 text-fd-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Attribute</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-fd-border">
          {data.map((row) => (
            <tr key={row.title}>
              <td className="px-4 py-3 align-top">
                <code className="rounded bg-fd-muted px-1.5 py-0.5 text-xs">
                  {row.title}
                </code>
              </td>
              <td className="px-4 py-3 text-fd-muted-foreground">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KeyboardShortcutsTable({ data }: { data: ShortcutRow[] }) {
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-fd-muted/50 text-fd-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Keys</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-fd-border">
          {data.map((row) => (
            <tr key={row.keys.join("+")}>
              <td className="px-4 py-3 align-top">
                <div className="flex flex-wrap gap-1">
                  {row.keys.map((key) => (
                    <code
                      key={key}
                      className="rounded bg-fd-muted px-1.5 py-0.5 text-xs"
                    >
                      {key}
                    </code>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-fd-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Tab, Tabs, TabsContent, TabsList, TabsTrigger };
