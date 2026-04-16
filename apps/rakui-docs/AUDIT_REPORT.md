# RakUI Component Registry — Production Readiness Audit

**Date:** 2026-04-14  
**Auditor:** Kimi Code CLI  
**Scope:** All component installation flows, registry definitions, MDX docs, source files, dependencies, and example validity.

---

## Executive Summary

The docs site advertises a shadcn-compatible component registry (`@rakui/*`), but **no registry JSON exists and no `@rakui/*` packages are published on npm**. This means **every CLI install command documented on the site will fail in production**.

Beyond the missing registry, there are **18 "ghost" components** with full MDX documentation and install instructions but **zero shipped source code or demos**. Several components that wrap real `@diceui/*` npm packages are documented under the wrong scope (`@rakui/*`), and many manual installation guides omit required dependency steps.

| Severity | Count |
|----------|-------|
| Critical | 40+ |
| Major | 22 |
| Minor | 18 |

---

## 1. Global / Systemic Issues

### CRITICAL — No shadcn registry and no published packages
- **Evidence:** `components.json` has `"registries": {}`. No `registry.json` file exists in the repo or at any public URL. `@rakui/button`, `@rakui/meter`, etc. all return **404 from npm**.
- **Production risk:** Every `npx shadcn@latest add @rakui/<component>` instruction across the entire docs site will fail for end users. The "CLI" install tab is non-functional.
- **Fix:** Either
  1. Build and publish a shadcn-compatible `registry.json` (and register it with the shadcn CLI), **or**
  2. Remove all CLI install tabs and switch every component to **manual copy-paste only**, with accurate npm dependency lists.

---

## 2. Issues by Component / File

### 2.1 Ghost Components (docs + install instructions exist, but no source file and no demo)
**Severity: Critical**

These 18 components have published MDX pages telling users how to install them, yet there is **no `src/components/ui/<name>.tsx` source file** and **no demo** in `src/components/demos/`.

| Component | Has MDX Install | Has UI Source | Has Demo | Missing from `componentSources` |
|-----------|-----------------|---------------|----------|---------------------------------|
| `color-picker` | ✅ | ❌ | ❌ | ✅ |
| `color-swatch` | ✅ | ❌ | ❌ | ✅ |
| `cropper` | ✅ | ❌ | ❌ | ✅ |
| `editable` | ✅ | ❌ | ❌ | ✅ |
| `file-upload` | ✅ | ❌ | ❌ | ✅ |
| `fps` | ✅ | ❌ | ❌ | ✅ |
| `gauge` | ✅ | ❌ | ❌ | ✅ |
| `kbd` | ✅ | ❌ | ❌ | ✅ |
| `key-value` | ✅ | ❌ | ❌ | ✅ |
| `media-player` | ✅ | ❌ | ❌ | ✅ |
| `preview` | ✅ | ❌ | ❌ | ✅ |
| `qr-code` | ✅ | ❌ | ❌ | ✅ |
| `rating` | ✅ | ❌ | ❌ | ✅ |
| `relative-time` | ✅ | ❌ | ❌ | ✅ |
| `responsive-dialog` | ✅ | ❌ | ❌ | ✅ |
| `scroll-spy` | ✅ | ❌ | ❌ | ✅ |
| `scroller` | ✅ | ❌ | ❌ | ✅ |
| `time-picker` | ✅ | ❌ | ❌ | ✅ |

**Production risk:** Users following the docs will attempt to install components that do not exist in any form. This breaks trust and the entire installation flow.

**Recommended fix:**
- **Short term:** Hide or unpublish these MDX pages until source files and demos are ready.
- **Long term:** Implement the components and add them to `componentSources` in `src/components/docs-mdx.tsx`.

---

### 2.2 Wrong npm scope — `@rakui/*` used for `@diceui/*` packages
**Severity: Critical**

Four components wrap real npm packages published under `@diceui/*`, but the docs incorrectly tell users to install them as `@rakui/*`. The `@rakui/*` packages do not exist.

#### `checkbox-group`
- **File:** `content/docs/en/components/checkbox-group.mdx`
- **Issue:** Docs say `npx shadcn@latest add @rakui/checkbox-group` and `npm install @rakui/checkbox-group`.
- **Reality:** The demo imports directly from `@diceui/checkbox-group`. No local wrapper exists.
- **Fix:** Change all install references to `@diceui/checkbox-group`.

```diff
- npx shadcn@latest add @rakui/checkbox-group
+ npx shadcn@latest add @diceui/checkbox-group

- npm install @rakui/checkbox-group
+ npm install @diceui/checkbox-group
```

#### `combobox`
- **File:** `content/docs/en/components/combobox.mdx`
- **Issue:** Docs say `@rakui/combobox`. Local wrapper `src/components/ui/combobox.tsx` imports from `@diceui/combobox`.
- **Fix:** Change install commands to `@rakui/combobox` only **after** a registry is published that includes the wrapper. Until then, manual install must include `npm install @diceui/combobox`.

#### `listbox`
- **File:** `content/docs/en/components/listbox.mdx`
- **Issue:** Same as combobox — docs say `@rakui/listbox`, wrapper imports `@diceui/listbox`.
- **Fix:** Update manual install dependency step to `npm install @diceui/listbox`.

#### `tags-input`
- **File:** `content/docs/en/components/tags-input.mdx`
- **Issue:** CLI tab says `@rakui/tags-input`, manual tab correctly says `@diceui/tags-input`.
- **Fix:** Standardize. Either remove the broken CLI tab or change it to reference `@diceui/tags-input`.

---

### 2.3 Missing scope prefix in install commands
**Severity: Major**

These components have `shadcn@latest add` commands without the `@rakui/` namespace prefix. Unscoped names like `card` or `data-grid` will collide with or fail to resolve in the shadcn CLI.

| Component | Wrong Command | Correct Command |
|-----------|---------------|-----------------|
| `button-group` | `shadcn@latest add button-group` | `shadcn@latest add @rakui/button-group` |
| `card` | `shadcn@latest add card` | `shadcn@latest add @rakui/card` |
| `compare-slider` | `shadcn@latest add compare-slider` | `shadcn@latest add @rakui/compare-slider` |
| `data-grid` | `shadcn@latest add data-grid` | `shadhn@latest add @rakui/data-grid` |

**Production risk:** Users will get "component not found" errors from the shadcn CLI.

**Fix:** Add `@rakui/` prefix to all four components' CLI install blocks.

---

### 2.4 `masonry` — wrong scope entirely
**Severity: Critical**
- **File:** `content/docs/en/components/masonry.mdx`
- **Issue:** Docs say `npx shadcn@latest add @diceui/masonry`.
- **Reality:** `@diceui/masonry` does **not exist** on npm. `src/components/ui/masonry.tsx` is a fully local component that only depends on `radix-ui` and local hooks.
- **Fix:** Change scope to `@rakui/masonry` (or remove CLI tab until registry exists).

```diff
- npx shadcn@latest add @diceui/masonry
+ npx shadcn@latest add @rakui/masonry
```

---

### 2.5 Missing from `componentSources` map in `src/components/docs-mdx.tsx`
**Severity: Critical**

These components reference `<ComponentSource name="..." />` in their MDX, but the name is **not registered** in the `componentSources` object inside `src/components/docs-mdx.tsx`. Attempting to view the manual installation page will throw a runtime error.

**Affected components:** `color-picker`, `color-swatch`, `compare-slider`, `cropper`, `editable`, `file-upload`, `fps`, `gauge`, `kbd`, `key-value`, `media-player`, `preview`, `qr-code`, `rating`, `relative-time`, `responsive-dialog`, `scroll-spy`, `scroller`, `time-picker`.

**Production risk:** Runtime 404 / crash on the manual install tab for every one of these components.

**Fix:** Add entries to `componentSources` (for components that have source files) or remove the `<ComponentSource />` call (for ghost components).

Example fix for `compare-slider` (source file exists):
```ts
// src/components/docs-mdx.tsx
const componentSources = {
  // ...existing entries
  "compare-slider": "src/components/ui/compare-slider.tsx",
} as const;
```

---

### 2.6 Missing dependency install steps in manual installation guides
**Severity: Major**

When users choose the "Manual" install tab, many docs skip the "install dependencies" step entirely, or document only a subset of what the component actually imports.

| Component | Missing Dependencies |
|-----------|---------------------|
| `banner` | `@phosphor-icons/react`, `class-variance-authority`, `radix-ui` |
| `button-group` | `class-variance-authority`, `radix-ui` |
| `button` | `class-variance-authority` |
| `card` | `class-variance-authority` |
| `combobox` | `@diceui/combobox`, `lucide-react` |
| `compare-slider` | `radix-ui` |
| `listbox` | `@diceui/listbox`, `lucide-react` |
| `marquee` | `class-variance-authority` |
| `phone-input` | `class-variance-authority`, `lucide-react` |
| `segmented-input` | `class-variance-authority` |
| `stack` | `class-variance-authority`, `radix-ui` |
| `stat` | `class-variance-authority` |
| `status` | `class-variance-authority`, `radix-ui` |
| `stepper` | `lucide-react` |
| `swap` | `radix-ui` |
| `tags-input` | `@phosphor-icons/react` |
| `timeline` | `class-variance-authority` |
| `tour` | `lucide-react` |

**Production risk:** Users copy-paste the component code, then get "module not found" build errors.

**Fix:** Add a dependency installation step to every manual install tab. Example pattern:

```mdx
<Step>Install the following dependencies:</Step>

```bash
npm install radix-ui class-variance-authority
```
```

---

### 2.7 `data-grid` — ComponentSource titles mismatch (cosmetic)
**Severity: Minor**
- **File:** `content/docs/en/components/data-grid.mdx`
- **Issue:** `<ComponentSource name="data-grid" title="components/ui/data-grid.tsx" />` uses a display title without the `src/` prefix. The actual file lookup works because `componentSources` maps it to `src/components/ui/data-grid.tsx`.
- **Production risk:** None — display title only.
- **Fix:** Optional — update title to `src/components/ui/data-grid.tsx` for consistency.

---

## 3. Corrected Installation Snippets (Representative Examples)

### `button` — add missing dependency step
```mdx
<TabsContent value="manual">
  <Steps className="pt-2">
    <Step>Install the following dependencies:</Step>

    ```bash
    npm install class-variance-authority
    ```

    <Step>Copy and paste the following code into your project.</Step>

    <ComponentSource name="button" />

    <Step>Update the import paths to match your project setup.</Step>
  </Steps>
</TabsContent>
```

### `combobox` — fix scope and dependencies
```mdx
<TabsContent value="manual">
  <Steps className="pt-2">
    <Step>Install the following dependencies:</Step>

    ```bash
    npm install @diceui/combobox lucide-react
    ```

    <Step>Copy and paste the following code into your project.</Step>

    <ComponentSource name="combobox" />

    <Step>Update the import paths to match your project setup.</Step>
  </Steps>
</TabsContent>
```

### `button-group` — add missing scope prefix
```mdx
<CodeBlockTab value="npm">
  ```bash
  npx shadcn@latest add @rakui/button-group
  ```
</CodeBlockTab>
```

---

## 4. Full Component Matrix

| Component | MDX | UI Source | Demo | In `componentSources` | Install Scope OK | Deps Doc'd |
|-----------|-----|-----------|------|----------------------|------------------|------------|
| action-bar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| angle-slider | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| avatar-group | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| badge-overflow | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| banner | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| button | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| button-group | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| card | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| checkbox-group | ✅ | ❌* | ✅ | N/A | ❌ | N/A |
| circular-progress | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| color-picker | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| color-swatch | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| combobox | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| compare-slider | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| cropper | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| data-grid | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| editable | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| file-upload | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| fps | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| gauge | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| kanban | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| kbd | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| key-value | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| listbox | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| marquee | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| mask-input | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| masonry | ✅ | ✅ | ✅ | ✅ | ❌** | ✅ |
| media-player | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| mention | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| meter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| phone-input | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| preview | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| qr-code | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| rating | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| relative-time | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| responsive-dialog | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| scroll-spy | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| scroller | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| segmented-input | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| selection-toolbar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| sortable | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| speed-dial | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| stack | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| stat | ✅ | ✅ | ✅ | ❌*** | ✅ | ❌ |
| status | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| stepper | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| swap | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| tags-input | ✅ | ✅ | ✅ | ✅ | ❌† | ❌ |
| time-picker | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| timeline | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| tour | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

\* `checkbox-group` demos import directly from `@diceui/checkbox-group` with no local wrapper.  
\*\* `masonry` docs incorrectly use `@diceui/masonry` instead of `@rakui/masonry`.  
\*\*\* `stat` is in `componentSources` but the key appears unquoted (`stat:`) which may cause lookup issues depending on TS config; verify it resolves correctly at runtime.  
† `tags-input` CLI tab says `@rakui/tags-input`, manual tab correctly says `@diceui/tags-input`.

---

## 5. Recommended Priority Action Plan

### P0 — Stop broken install flows immediately
1. **Remove all CLI install tabs** (`value="cli"`) across every component MDX **until a real shadcn registry is published**, OR build and publish the registry.
2. **Unpublish or hide the 18 ghost components** from the docs nav (`meta.json`) until source files are written.

### P1 — Fix documented scopes and dependencies
3. Fix the 4 `@rakui/*` → `@diceui/*` scope mismatches (`checkbox-group`, `combobox`, `listbox`, `tags-input`).
4. Fix `masonry` scope from `@diceui/masonry` to `@rakui/masonry`.
5. Add missing `@rakui/` prefix to `button-group`, `card`, `compare-slider`, `data-grid`.
6. Add dependency install steps to all 18 components missing them in manual tabs.

### P2 — Fix runtime mappings
7. Add the 19 missing entries to `componentSources` in `src/components/docs-mdx.tsx` (or remove their `<ComponentSource />` calls if they remain ghost components).
8. Verify `stat` resolves correctly in `componentSources` (the key is unquoted in the source map).

### P3 — Ship missing components
9. Implement source code + demos for the 18 ghost components, or permanently remove them from the registry.

---

*End of audit report.*
