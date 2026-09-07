# prep-design-system

![CI](https://github.com/ahmedtawfikgalal/prep-design-system/actions/workflows/ci.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/@ahmed.tawfik.galal/prep-design-system.svg)](https://www.npmjs.com/package/@ahmed.tawfik.galal/prep-design-system)

A token-driven React + TypeScript component library, built with accessibility and a single source of truth for design values as first-class requirements — not afterthoughts.

Published on npm: [`@ahmed.tawfik.galal/prep-design-system`](https://www.npmjs.com/package/@ahmed.tawfik.galal/prep-design-system)

## Install

```bash
npm install @ahmed.tawfik.galal/prep-design-system
```

This package has `react` and `react-dom` as peer dependencies (`^19.0.0`) — install those in your own project if you haven't already.

Import the stylesheet once, anywhere in your app's entry point:

```ts
import '@ahmed.tawfik.galal/prep-design-system/style.css';
```

## Components

| Component | What it does |
|---|---|
| **Button** | Primary/secondary variants, disabled state, safe `type="button"` default |
| **Input** | Token-driven, forwards native props and refs, supports invalid state |
| **Modal** | Accessible dialog — overlay/Escape/close-button dismiss, `role="dialog"` + `aria-modal` |
| **Toast** | Info/success/error variants, optional auto-dismiss, correct `alert`/`status` roles |
| **DataTable** | Generic, supports custom cell rendering, handles empty state |
| **FormField** | Automatically wires label, hint, and error message to its control — zero manual ARIA wiring required |

Every component ships with a co-located `.css` file (tokens only, no hardcoded values), Storybook stories covering realistic states, and a behavioral test suite (not just render checks).

## Quick example — FormField's automatic accessibility wiring

```tsx
import { FormField, Input } from '@ahmed.tawfik.galal/prep-design-system';

<FormField label="Email" error="This field is required">
  <Input />
</FormField>
```

No manual `aria-describedby`, no manual `id` matching, no manual `aria-invalid`. FormField generates a stable id, links the label via `htmlFor`, and injects the correct ARIA attributes onto its child automatically. See [ADR 0003](docs/adr/0003-accessible-composition-via-clone-element.md) for why this is built this way, and what it requires of any control used inside FormField.

## Design tokens

Design values (colors, spacing, typography, and effects like radius/shadow/z-index) are **not** hand-written in multiple places. They live as JSON under `design-system/tokens/`, and are compiled into `src/tokens/tokens.css` (CSS custom properties) via [Style Dictionary](https://styledictionary.com/).

**To add or change a token:**
1. Edit the relevant JSON file under `design-system/tokens/`
2. Regenerate the CSS: `npm run tokens:build`
3. Commit the JSON change and the regenerated `src/tokens/tokens.css` together

Never edit `src/tokens/tokens.css` directly — it's a generated file. See [ADR 0002](docs/adr/0002-style-dictionary-single-source-of-truth.md) for the reasoning.

## Contributing a component or change

See [`docs/RELEASING.md`](docs/RELEASING.md) for the full step-by-step workflow, including how to add a changeset and cut a release. Short version:

1. Build the component (+ CSS + stories + tests), following the existing components as the pattern
2. Run `npm run lint && npx vitest run && npm run build:lib`
3. Run `npx changeset` and describe your change
4. Commit the component and the changeset file together

Versioning and `CHANGELOG.md` are managed by [Changesets](https://github.com/changesets/changesets) — see [ADR 0004](docs/adr/0004-changesets-for-release-workflow.md).

## Development

```bash
npm install --legacy-peer-deps
npm run tokens:build      # generate tokens.css from JSON — required before first run
npm run dev                # run the app
npm run storybook          # component playground at http://localhost:6006
npx vitest run             # unit + Storybook interaction tests
npm run lint
npm run build               # build the demo app
npm run build:lib           # build the publishable package (dist/)
npm run size                 # check bundle size against limits
```

> `--legacy-peer-deps` is currently required due to a version mismatch between `@storybook/addon-vitest` and `vitest@5.x`. Safe to remove once Storybook publishes a compatible release.

## Architecture decisions

Significant design decisions are documented as ADRs in [`docs/adr/`](docs/adr/):

- [0001 — Styling approach: inline styles vs. CSS](docs/adr/0001-styling-approach-inline-styles-vs-css.md)
- [0002 — Style Dictionary as the tokens single source of truth](docs/adr/0002-style-dictionary-single-source-of-truth.md)
- [0003 — Accessible composition via `cloneElement`](docs/adr/0003-accessible-composition-via-clone-element.md)
- [0004 — Changesets for release workflow](docs/adr/0004-changesets-for-release-workflow.md)

## CI

Every push to `main` runs lint, token generation, the full test suite (unit + Storybook browser tests via Playwright), both app and Storybook production builds, and a bundle size check. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).