# ADR 0002: Design Tokens — Style Dictionary as Single Source of Truth

## Status
Accepted

## Context
Following ADR 0001's decision to move from inline styles to CSS
custom properties, the project initially had design tokens defined
twice: once as hand-written TypeScript objects (`src/tokens/*.ts`,
consumed by component logic) and once as a hand-written CSS file
(`tokens.css`, consumed by component stylesheets).

Maintaining the same values in two places by hand is a known source
of drift — a color changed in one file but not the other silently
breaks consistency, and nothing catches the mismatch.

## Options considered

1. **Keep both files hand-written**
   - Pros: no new dependency, simplest to understand
   - Cons: manual duplication, no single source of truth, drift risk
     grows with every new token and every new output format

2. **Custom build script** (generate CSS from the `.ts` files)
   - Pros: lightweight, no new dependency
   - Cons: not a recognized industry pattern; solves a problem that
     an established, purpose-built tool already solves

3. **Style Dictionary**
   - Pros: industry-standard tool for exactly this problem; takes a
     single JSON source and generates CSS, JS, iOS, Android, and
     other platform outputs; used widely in real design systems
   - Cons: requires tokens to live as JSON rather than TypeScript,
     and requires learning its config format

## Decision
Adopt Style Dictionary. Design tokens now live as JSON files under
`design-system/tokens/` (the single source of truth). A build step
(`npm run tokens:build`, via `style-dictionary.config.mjs`) generates
`src/tokens/tokens.css`, which components' CSS files reference via
`var(--color-primary)` etc.

The previous hand-written `src/tokens/colors.ts`, `spacing.ts`, and
`typography.ts` files have been deleted.

## Consequences
- Tokens must be edited in `design-system/tokens/*.json`, then
  `npm run tokens:build` must be re-run to regenerate `tokens.css`.
  This is a manual step for now — a future improvement would be
  wiring token builds into the dev server or a pre-commit hook so
  regeneration isn't forgotten.
- `tokens.css` is a generated file (marked "Do not edit directly" in
  its own header) and must be imported into any environment that
  renders components — this currently means both `src/main.tsx` (the
  app) and `.storybook/preview.tsx` (Storybook), since Storybook has
  a separate entry point and does not share the app's `main.tsx`.
- Adds `style-dictionary` as a dev dependency.
- Style Dictionary's output isn't limited to CSS — if this system
  ever needs to support other platforms (e.g. React Native, iOS,
  Android), the same JSON source can generate those outputs too,
  without redefining tokens per platform.