# ADR 0001: Styling Approach for Components

## Status
Accepted (revisiting for v2)

## Context
Button v1 was built using inline styles (`style={{ ... }}`) driven by
design tokens (`colors.ts`, `spacing.ts`). This was the fastest way to
get a working, token-driven component with visible variants (primary,
secondary).

However, inline styles cannot express pseudo-classes like `:hover`,
`:focus-visible`, or `:active` without extra JavaScript (e.g., manual
`onMouseEnter`/`onMouseLeave` state). The tokens file already defines
`primaryHover` and `secondaryHover` values that are currently unused
because of this limitation.

## Options considered

1. **Keep inline styles**
   - Pros: simple, no extra tooling, colocated with component logic
   - Cons: no native hover/focus/active states, harder to override,
     duplicated hardcoded values (e.g. borderRadius) creep in over time

2. **CSS Modules / plain CSS classes**
   - Pros: full pseudo-class support, standard, works with any bundler
   - Cons: styles live in a separate file from the component

3. **CSS-in-JS library (e.g. styled-components, Emotion)**
   - Pros: colocated styles, dynamic props, full pseudo-class support
   - Cons: extra dependency, runtime overhead, adds complexity for a
     small design system

## Decision
Move from inline styles to CSS custom properties (CSS variables) bound
to design tokens, with a plain `.css` file (or CSS Module) per
component. This keeps the token-driven approach, unlocks `:hover` and
`:focus-visible` states, and avoids adding a CSS-in-JS runtime
dependency for what is currently a small component set.

## Consequences
- Button (and future components) will each get a companion `.css`
  file instead of relying solely on the `style` prop.
- Design tokens will need to be exposed as CSS variables (e.g. in a
  `:root` block or a tokens.css file) so component CSS can reference
  them, instead of only existing as TypeScript objects.
- This is a breaking change to Button's internals, but not to its
  public prop API — existing usage (`<Button variant="secondary">`)
  is unaffected.