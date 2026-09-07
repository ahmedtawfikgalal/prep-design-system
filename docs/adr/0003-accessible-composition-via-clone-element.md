# ADR 0003: Accessible Composition via cloneElement

## Status
Accepted

## Context
FormField needs to associate a label, an optional hint, and an
optional error message with a single form control (Input, and
potentially other controls later), so that:
- The label is programmatically linked to the control (`htmlFor`/`id`)
- Screen readers announce the hint/error via `aria-describedby`
- The control reflects invalid state via `aria-invalid`

The naive approach — requiring the consumer to manually wire these
attributes themselves — was rejected. Accessibility wiring that
depends on a consumer remembering a manual step is accessibility
that gets skipped under time pressure; the first few usages get it
right, later ones copy a pattern and drop the manual step, and the
result is a silently broken screen-reader experience.

## Options considered

1. **Manual wiring by the consumer**
   - Pros: simplest to implement, no "magic"
   - Cons: opt-in accessibility is accessibility that will eventually
     be forgotten; violates the goal of correct-by-default components

2. **Render props / children-as-function**
   - Pros: explicit, consumer has full control
   - Cons: awkward call-site ergonomics (`<FormField>{(props) => <Input {...props} />}</FormField>`),
     inconsistent with every other component's plain-JSX-children API

3. **cloneElement on a single child**
   - Pros: consumer writes plain, ordinary JSX (`<FormField><Input /></FormField>`);
     FormField injects `id`, `aria-describedby`, `aria-invalid` automatically;
     zero manual wiring, zero chance to forget it
   - Cons: requires the child to actually forward the injected props to
     the underlying DOM node (ref + prop spreading), which is not
     guaranteed for an arbitrary component; only works for exactly one
     child element, not multiple or plain text

## Decision
Use `cloneElement` on a single child, enforced via `Children.only`
(FormField throws if given zero, multiple, or non-element children).
`Input` was updated as a prerequisite: it previously used an explicit
prop allowlist and did not spread arbitrary/injected props onto the
underlying `<input>`, which would have caused cloneElement-injected
attributes to be silently dropped — a "looks wired but isn't" failure
mode that is worse than not wiring it at all. Input now extends
`React.ComponentPropsWithRef<'input'>` and forwards a ref via React 19
ref-as-prop, so injected `id`/`aria-describedby`/`aria-invalid` reach
the real DOM element.

`Children.only` was deliberately kept strict rather than relaxed to
tolerate multiple children: a single explicit control is the correct
contract for automatic aria wiring. A field needing multiple controls
(e.g. a radio group) should be a separate, deliberately-designed
component rather than FormField silently doing something ambiguous
with more than one child.

## Consequences
- Any control used inside FormField (not just Input) must forward
  refs and spread/accept arbitrary props through to its underlying
  DOM node, or the injected accessibility attributes will be silently
  dropped. This is now a documented requirement for any future
  FormField-compatible control (Select, Textarea, etc.).
- `FormField`'s public API dropped the `htmlFor` prop — `id` is now
  optional and auto-generated via `useId()` when omitted, since
  FormField owns the id/label/control association internally.
- `<FormField>` throws if given anything other than exactly one
  element child. This is intentional: a loud failure during
  development is preferable to a silent accessibility gap in
  production.
- Consumer-facing usage is now simply:
```tsx
  <FormField label="Email" error="Required">
    <Input />
  </FormField>
```
  with zero manual `aria-describedby`/`aria-invalid` wiring required.