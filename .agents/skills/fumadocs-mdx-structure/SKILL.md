---
name: fumadocs-mdx-structure
description: Create MDX documentation files with proper frontmatter, imports, and component integration. Apply when creating or updating Fumadocs documentation pages in content/docs/.
---

## Fumadocs MDX Structure

Create well-structured MDX documentation files for 8-bit components following the established patterns.

### Frontmatter Pattern

```mdx
---
title: Component Name
description: Brief description of the 8-bit component.
---
```

### Import Pattern

All documentation files require these imports:

```mdx
import { ComponentName } from "@/components/ui/8bit/component-name";
import CopyCommandButton from "@/components/copy-command-button";
import InstallationCommands from "@/components/installation-commands";
import ComponentPreview from "@/components/component-preview";
```

### Copy Command Button

Place immediately after frontmatter:

```mdx
<div className="flex flex-col md:flex-row items-center justify-end gap-2 mb-2">
  <CopyCommandButton
    copyCommand="pnpm dlx shadcn@latest add @8bitcn/component-name"
    command="pnpm dlx shadcn@latest add @8bitcn/component-name"
  />
</div>
```

### Component Preview

Wrap component examples with the improved preview block:

```mdx
<ComponentPreview 
  title="Component Name"
  description="Optional description of the component"
  lang="tsx"
  code={`export function Example() {
  return <ComponentName>Example</ComponentName>;
}`}
>
  <ComponentName>Example</ComponentName>
</ComponentPreview>
```

**Props:**
- `title` (string): Display title for the preview
- `description` (string, optional): Additional context
- `code` (string): The source code to display in the Code tab
- `lang` (string, optional): Language for syntax highlighting (default: 'tsx')
- `previewClassName` (string, optional): Additional classes for the preview area
- `className` (string, optional): Additional classes for the container

### Installation Section

```mdx
## Installation

---

<InstallationCommands packageName="component-name" />
```

### Usage Section

```mdx
## Usage

---

```tsx
import { ComponentName } from "@/components/ui/8bit/component-name"
```

```tsx
<ComponentName variant="outline">Example</ComponentName>
```
```

### Complete Example

```mdx
---
title: Button
description: Displays an 8-bit button component.
---

import { Button } from "@/components/ui/8bit/button";
import CopyCommandButton from "@/components/copy-command-button";
import InstallationCommands from "@/components/installation-commands";
import ComponentPreview from "@/components/component-preview";

<div className="flex flex-col md:flex-row items-center justify-end gap-2 mb-2">
  <CopyCommandButton
    copyCommand="pnpm dlx shadcn@latest add @8bitcn/button"
    command="pnpm dlx shadcn@latest add @8bitcn/button"
  />
</div>

<ComponentPreview title="8-bit button component" name="button">
  <Button>Button</Button>
</ComponentPreview>

## Installation

---

<InstallationCommands packageName="button" />

## Usage

---

```tsx
import { Button } from "@/components/ui/8bit/button"
```

```tsx
<Button variant="outline">Button</Button>
```
```

### Props Table

Document component props with the improved PropsTable:

```mdx
<PropsTable
  props={[
    {
      name: "variant",
      type: "'default' | 'outline' | 'ghost'",
      default: "'default'",
      description: "The visual style variant of the component",
      required: false,
    },
    {
      name: "onClick",
      type: "() => void",
      description: "Callback when clicked",
      required: true,
    },
  ]}
/>
```

**PropDef fields:**
- `name` (string): Property name
- `type` (string): TypeScript type
- `description` (string): Property description
- `default` (string, optional): Default value
- `required` (boolean, optional): Whether the prop is required

### Key Principles

1. **Frontmatter required** - title and description are mandatory
2. **Import order** - Component → utilities → UI components
3. **Copy button** - Place before ComponentPreview
4. **ComponentPreview** - Use for all component examples with title and code props
5. **PropsTable** - Document all component props with proper types
6. **Code blocks** - Use ```tsx for TypeScript examples
7. **Section separators** - Use `---` after headings
8. **Fumadocs patterns** - Use Fumadocs UI Tabs for tabbed interfaces

### File Location

Place documentation files in:
- `content/docs/components/component-name.mdx` for components
- `content/docs/blocks/category/block-name.mdx` for blocks
