# ADR 0004: Changesets for Versioning and Release Workflow

## Status
Accepted

## Context
The package is now published to npm (`@ahmed.tawfik.galal/prep-design-system`).
Manually bumping `package.json`'s version and writing changelog entries
by hand does not scale even for a single maintainer: it's easy to forget,
gives no structured record of *why* a version changed, and gives no
consistent rule for whether a change deserves a patch, minor, or major
bump.

## Options considered

1. **Manual versioning**
   - Pros: no new tooling
   - Cons: no changelog discipline, no enforced patch/minor/major
     reasoning, relies entirely on memory

2. **Changesets**
   - Pros: industry-standard tool for exactly this problem; a small
     markdown file per change captures intent and bump type at the
     time the change is made (when the reasoning is freshest); auto-
     generates `CHANGELOG.md` from those files; supports monorepos if
     this project ever grows into one
   - Cons: adds a step to the contribution workflow; requires
     discipline to write a changeset for every user-facing change

## Decision
Adopt Changesets, configured for a solo, direct-to-`main` workflow:
- `commit: false` — changeset files and version bumps are committed
  manually, as part of the normal reviewed commit process, not
  auto-committed by the tool
- `changelog: "@changesets/cli/changelog"` — the plain changelog
  format, not the GitHub-integrated one, since this isn't (yet) a
  multi-contributor PR-based project
- `access: "public"` — matches the package's actual published
  visibility on npm
- `baseBranch: "main"` — matches the actual release branch

The full step-by-step workflow (when to run `changeset` vs.
`changeset version` vs. `npm publish`) is documented in
[`docs/RELEASING.md`](../RELEASING.md), not duplicated here — this
ADR records the *decision*, the release doc records the *process*,
so the process can be updated without needing a new ADR each time.

## Consequences
- Every user-facing change to a component should be accompanied by a
  changeset file (`npx changeset`) in the same commit, describing
  what changed and at what bump level.
- `CHANGELOG.md` is now a generated file once `changeset version` is
  run — should not be hand-edited directly, same principle as
  `tokens.css` in ADR 0002.
- If this project ever grows to include multiple published packages
  (e.g. splitting components into separate packages), Changesets
  already supports that via its `fixed`/`linked` config options
  without needing a tooling change.