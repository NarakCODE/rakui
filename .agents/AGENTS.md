# RakUI Agent Team

Project-specific subagents for the RakUI component website.

## Primary docs workflow agents

| Agent | Purpose | Main responsibility |
|-------|---------|---------------------|
| `docs-writer` | Write English component docs | Own `content/docs/en/components/*.mdx`, installation guidance, usage sections, and API coverage |
| `demo-creator` | Build interactive demos | Own `src/components/demos/*` and register previews in `src/components/docs-mdx.tsx` when needed |
| `content-reviewer` | Review docs before publishing | Audit docs, demos, and registry wiring for gaps, regressions, or inconsistencies |

## Extended agents

| Agent | Purpose |
|-------|---------|
| `km-docs-writer` | Write Khmer translations |
| `ui-component-builder` | Build reusable UI primitives |
| `site-maintainer` | Handle site config, routing, and infrastructure |

## Recommended flow

1. `ui-component-builder` for the component itself when a primitive does not exist yet.
2. `demo-creator` for live preview components in `src/components/demos/`.
3. `docs-writer` for the English MDX page and source/demo wiring.
4. `content-reviewer` for a findings-first QA pass before publishing.
5. `km-docs-writer` only when a Khmer translation is needed.

## Quick usage

```bash
@demo-creator Create a responsive demo for the sortable component and wire it into src/components/docs-mdx.tsx

@docs-writer Document the sortable component in content/docs/en/components/sortable.mdx using the existing RakUI MDX pattern

@content-reviewer Review content/docs/en/components/sortable.mdx plus its demos for missing examples, broken references, and API gaps
```

## Repo expectations

- Follow the existing RakUI patterns in `content/docs/en/components/`, `src/components/demos/`, and `src/components/ui/`.
- For non-trivial work, update `tasks/todo.md` before broad edits.
- Prefer minimal changes and fix the root cause.
- Verify with the relevant checks, usually `pnpm run types:check`.
- Use `docs-writer` as the canonical name; the common typo `docs-writter` is not the configured agent name.
