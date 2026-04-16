# Tasks

## Audit & Fix Docs Consistency for Fumadocs Conventions

### Goal
Fix structural inconsistencies across the MDX documentation so every page follows the same Fumadocs conventions, installation pattern, and live-preview wiring.

### Phase 1 — Fix Navigation & Structural Bugs
- [ ] Fix `content/docs/en/components/meta.json`: change `data-grid` → `data-table`
- [ ] Fix `content/docs/en/meta.json`: remove `test` from pages array
- [ ] Fix broken Khmer link in `content/docs/km/components/radix/action-bar.mdx`
- [ ] Remove redundant H1 headings from component pages (Fumadocs already renders frontmatter title)
- [ ] Clean up unused frontmatter fields (`base: radix`, `component: true`, `preview`, `links`) where they aren't consumed by the site

### Phase 2 — Standardize Component Docs Stubs
For the ~25 component stubs that only show `npm install @rakui/xxx` with no live preview:
- [ ] Replace simple npm-install sections with repo-standard `CodeTabs` (CLI + Manual tabs, with npm/pnpm/yarn/bun sub-tabs where applicable)
- [ ] Wrap existing usage examples in `<ComponentPreview>` so users see rendered output + code
- [ ] Ensure every component page has at minimum: frontmatter, intro text, Installation, Usage, and API Reference sections
- [ ] Standardize API Reference tables to use `<TypeTable>` (or `<AutoTypeTable>` where type modules exist)

### Phase 3 — Fix Index Pages
- [ ] Rewrite `content/docs/en/index.mdx` with real RakUI welcome content instead of Fumadocs placeholder
- [ ] Rewrite `content/docs/en/components/index.mdx` with an overview and category cards linking to actual components
- [ ] Ensure `content/docs/en/utilities/index.mdx` is consistent with the components index style

### Phase 4 — Khmer i18n Decision
- [ ] Decide on Khmer docs strategy: either remove the partial `km/` tree (only 2 files, broken links) or add redirects/placeholders so it doesn't break navigation

### Verification
- [ ] Run `pnpm run types:check` after changes
- [ ] Confirm no broken MDX component references
- [ ] Record results

---

# Tasks

## Implement timeline component demo and docs

### Goal
Add the missing timeline UI component, ship a client demo for the docs, and replace the stub `timeline.mdx` page with accurate installation, usage, examples, and API details.

### Plan
- [x] Review current timeline docs, demo registry, and helper utilities to scope the missing implementation
- [x] Add `src/components/ui/timeline.tsx` using the provided setup adapted to repo conventions
- [x] Add a client demo in `src/components/demos/timeline-demo.tsx`
- [x] Register the demo and component source in the docs MDX registry
- [x] Rewrite `content/docs/en/components/timeline.mdx` to use the live demo and accurate examples
- [x] Run relevant verification and record results

### Results
- Added a new `Timeline` primitive in `src/components/ui/timeline.tsx` with vertical, horizontal, alternate, and RTL-aware behavior.
- Added `src/components/demos/timeline-demo.tsx` and registered it so the docs render a live interactive client demo with orientation, variant, direction, and active-step controls.
- Replaced the stub `content/docs/en/components/timeline.mdx` page with installation, usage, examples, accessibility notes, and API tables.
- Added `types/radix/timeline.ts` plus MDX registry wiring for timeline source and prop tables.
- Verification: `npm run types:check` reached TypeScript and failed on a pre-existing unrelated error in `src/components/demos/swap-demo.tsx` due to duplicate `MoonIcon` imports. No timeline-related type errors were reported.

### Follow-up
- [x] Replace the all-in-one timeline demo with focused demos
- [x] Add a dedicated `TimelineHorizontalDemo`
- [x] Wire the horizontal demo into `timeline.mdx`
- [x] Run targeted verification and note the result

### Follow-up Results
- Replaced the original all-in-one interactive timeline preview with a simple baseline `TimelineDemo`.
- Added `src/components/demos/timeline-horizontal-demo.tsx` for a dedicated horizontal timeline example using Q1 to Q3 milestones.
- Registered the new demo in the preview registries and rendered it in the `Horizontal Layout` section of `content/docs/en/components/timeline.mdx`.
- Verification: `npx tsc --noEmit --pretty false` completed successfully after the demo split.

### RTL Follow-up
- [x] Add a dedicated `TimelineRtlDemo`
- [x] Register the RTL demo in the preview registries
- [x] Wire the RTL demo into `timeline.mdx`
- [x] Run targeted verification and note the result

### Additional Follow-up
- [x] Add a dedicated `TimelineAlternateDemo`
- [x] Add a dedicated `TimelineCustomDotDemo`
- [x] Register the new timeline demos in the preview registries
- [x] Wire the new demos into `timeline.mdx`
- [x] Run targeted verification and note the result

### Final Follow-up Results
- Added `src/components/demos/timeline-rtl-demo.tsx` for a focused right-to-left example using the event registration sequence.
- Added `src/components/demos/timeline-alternate-demo.tsx` for the alternating two-sided layout example.
- Added `src/components/demos/timeline-custom-dot-demo.tsx` for icon-based dots with a custom `--timeline-dot-size`.
- Registered the new demos in the docs preview registries and rendered them in the `RTL`, `Alternate Layout`, and `Custom Dots` sections of `content/docs/en/components/timeline.mdx`.
- Verification: `npx tsc --noEmit --pretty false` completed successfully after adding the new timeline demos.
- Updated the `Timeline` installation command tab in `content/docs/en/components/timeline.mdx` to support `npm`, `pnpm`, `yarn`, and `bun`.
- Verification: `npm run types:check` completed successfully after the installation tab update.
- Extended `ComponentSource` in `src/components/docs-mdx.tsx` to support code-block titles and used it in the `Timeline` manual installation section so each copied file now shows its destination path header.
- Verification: `npm run types:check` completed successfully after the manual installation header update.
- Adjusted the default max width of the demo preview wrapper in `src/components/component-preview-client.tsx` from an ineffective full-width condition to a real centered `max-w-4xl`, while still allowing overrides through `previewClassName`.
- Verification: `npx tsc --noEmit --pretty false` completed successfully after the preview width update.

---

## Rewrite data-grid.mdx to match Dice UI structure (Rakui-adapted)

### Goal
Replicate the Dice UI data-grid documentation page structure for Rakui's data-grid component.

### Plan
- [x] Read Dice UI page structure
- [x] Read current Rakui data-grid.mdx
- [x] Read Rakui useDataGrid hook for actual API
- [x] Read Rakui DataGrid component for actual props
- [x] Rewrite data-grid.mdx with:
  - Frontmatter matching Rakui conventions
  - ComponentTabs demo
  - Installation section (CLI + manual with CodeTabs)
  - Usage section with all subsections from Dice UI adapted to Rakui API:
    - Basic Data Grid
    - With Row Management (onRowAdd, onRowsDelete via deleteRow)
    - With Search (enableSearch)
    - With Paste Support (enablePaste)
    - Read-Only Mode
    - RTL Support
    - Auto Focus
    - Custom Height
  - Cell Variants section (short-text, long-text, number, checkbox, select, date)
  - Row Selection section
  - Cell Architecture section
  - Column Configuration section (filtering/sorting, pinning, resizing)
  - Context Menu Actions (copy/cut/clear/delete)
  - Keyboard Shortcuts section with tables
  - API Reference with TypeTable components for:
    - useDataGrid
    - DataGrid
    - Cell Variants table
    - DataGridKeyboardShortcuts

### Notes
- Rakui does NOT have: DataGridUndoRedo, DataGridSortMenu, DataGridFilterMenu, DataGridViewMenu, DataGridRowHeightMenu, DataGridSkeleton, file cell, multi-select cell, url cell, stretchColumns, autoFocus prop, DataGridSelectColumn helper
- Rakui DOES have: useDataGrid (with enableSorting, enableFiltering, enablePaste, onRowAdd, getRowId, initialState), DataGrid (with table, height, editingState, onCellEdit, onCellClick, onKeyDown, enableSorting, enableFiltering, className), DataGridKeyboardShortcuts (enableSearch)
- Use TypeTable MDX component (from compare-slider.mdx) for API reference
- Use KeyboardShortcutsTable MDX component for keyboard shortcuts
- Use CodeTabs/TabsList/TabsTrigger/TabsContent/Steps/Step for installation
- Use ComponentSource for source code
