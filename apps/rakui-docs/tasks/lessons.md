# Lessons

- Mistake: I refactored `button-group.mdx` before fixing the underlying documentation rule source in `AGENTS.md`.
  - Cause: I acted on the page-level request before aligning the repository-level instruction file that the user wanted to standardize.
  - Prevention: When the user points to documentation policy or template language, update the governing instruction file first, then apply page-level refactors only after that source of truth is settled.

- Mistake: I first wrote the Combobox wrapper and docs with a malformed MDX closing fence and inconsistent Dice data-attribute variants.
  - Cause: I mirrored the visual structure quickly before checking the exact repo MDX shape and the exact class syntax from the provided demo.
  - Prevention: After drafting new component docs, immediately re-read the rendered MDX source and compare utility classes against the provided reference before verification.

- Mistake: I initially passed `--store-dir` through `pnpm run`, which forwarded the flag into the underlying script instead of pnpm itself.
  - Cause: I treated pnpm config flags like command flags during verification retries.
  - Prevention: When pnpm store configuration matters, apply it only on install/link commands or verify the exact flag behavior before reusing it with `run`.

Agent Purpose Best For
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
docs-writer English documentation Writing component docs with proper MDX, frontmatter, props tables
km-docs-writer Khmer translations Translating docs to ភាសាខ្មែរ while preserving code examples
demo-creator Interactive demos Building React demo components in src/components/demos/
ui-component-builder UI components Creating reusable components with Radix + CVA patterns
site-maintainer Infrastructure Next.js config, routing, i18n setup, build issues
content-reviewer Quality assurance Reviewing docs for completeness and consistency
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
🚀 Usage Examples

# Write documentation for a new component

@docs-writer Create documentation for "tabs" component

# Translate to Khmer

@km-docs-writer Translate content/docs/en/components/tabs.mdx to Khmer

# Build interactive demo

@demo-creator Create a demo for the tabs component

# Review before publishing

@content-reviewer Review the tabs documentation

# Fix build/config issues

@site-maintainer Fix the i18n routing issue
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
📁 Created Files
.agents/
├── docs-writer.agent.json
├── km-docs-writer.agent.json
├── demo-creator.agent.json
├── ui-component-builder.agent.json
├── site-maintainer.agent.json
├── content-reviewer.agent.json
└── AGENTS.md # Usage guide

.kimi/
└── agents.json # Kimi Code CLI config

The agents are configured to work with your Fumadocs + Next.js 16 + i18n setup. Each agent knows the project structure and follows your existing patterns in the codebase.
