# Releasing

This document describes the exact workflow for changing components and
publishing new versions of `@ahmed.tawfik.galal/prep-design-system`.

See [ADR 0004](adr/0004-changesets-for-release-workflow.md) for why this
process uses Changesets.

## When you add or update a component

1. Write or edit the component, its `.css` file (tokens only — no
   hardcoded values), its `.stories.tsx`, and its `.test.tsx`.

2. If the change needs a new design token, add it to the relevant JSON
   file under `design-system/tokens/`, then regenerate:
```bash
   npm run tokens:build
```
   Never hand-edit `src/tokens/tokens.css` directly — it's generated.

3. If you added a **new** component (not just updated an existing one),
   export it from `src/index.ts` so it's part of the public package API.

4. Run the full local check suite before committing:
```bash
   npm run lint
   npx vitest run
   npm run build
   npm run build:lib
   npm run size
```

5. Create a changeset describing the change:
```bash
   npx changeset
```
   This asks which kind of bump the change deserves:
   - **patch** — bug fix, visual tweak, no API change
   - **minor** — new component, new prop, backwards-compatible addition
   - **major** — breaking change to an existing component's public API

   It then asks for a short, human-readable summary. Write this as if
   explaining the change to someone reading the changelog later — e.g.
   "Add disabled state to Input" rather than "fix stuff."

   This writes a new markdown file into `.changeset/`.

6. Commit the component files **and** the changeset file together, in
   your normal Conventional Commits style:
```bash
   git add src/components/YourComponent .changeset/*.md
   git commit -m "feat(yourcomponent): <description>"
   git push
```
   CI runs automatically on push and must be green before proceeding.

## When you're ready to actually release a new version

This step is separate and deliberate — you don't publish on every commit,
only when you're ready to cut a real release (e.g., after a batch of
component changes, or before sharing the package link somewhere).

7. Consume all pending changesets and bump the version:
```bash
   npx changeset version
```
   This reads every file in `.changeset/`, bumps `package.json`'s
   version by the highest bump level among them, writes/updates
   `CHANGELOG.md`, and deletes the consumed changeset files.

8. Review the diff — check `package.json`'s new version and
   `CHANGELOG.md`'s new entry look correct — then commit:
```bash
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore(release): version X.Y.Z"
   git push
```

9. Publish to npm:
```bash
   npm publish --access public
```
   The `prepublishOnly` script automatically rebuilds `dist/` fresh
   before publishing, so this always ships the latest built code.

10. Verify it's live:
```bash
    npm view @ahmed.tawfik.galal/prep-design-system
```

## Quick reference

| Situation | Command |
|---|---|
| Just made a component change | `npx changeset` (then commit with your component) |
| Ready to cut a new version | `npx changeset version` (then commit) |
| Ready to publish that version | `npm publish --access public` |