# AGENTS.md

## Scope
- This repository is the `@lipemat/js-helpers` package: a collection of framework-agnostic TypeScript helper utilities published to npm.
- The public entrypoint is `src/index.ts`, a barrel that re-exports every helper. Consumers import from the package root: `import {debounce} from '@lipemat/js-helpers'`.
- The build is a plain `tsc` emit from `src` to `dist` (compiled `.js` + `.d.ts`), driven by `yarn build`. There is no bundler.

## Architecture map
- Each helper lives in its own directory under `src/<helper>/`.
  - `src/<helper>/<helper>.ts` — the implementation. The file is named after the helper, never `index.ts`.
  - `src/<helper>/Readme.md` — the helper's documentation.
- `src/index.ts` is the barrel. Every helper directory must be re-exported here with an explicit `.js` extension, e.g. `export * from './debounce/debounce.js';`.
- Tests live in `jest/tests/<helper>.test.ts`, one suite per helper.
- Internal cross-helper imports use a relative path with a `.js` extension that resolves to the `.ts` source (NodeNext + `verbatimModuleSyntax`), e.g. `import type {Callback} from '../once/once.js';`.

## How to document a helper
Every helper directory contains a `Readme.md` with the following structure:

1. `# <helper>` — the helper name as the title.
2. A one or two sentence summary of what the helper does and any notable dependency (e.g. DOMPurify) or DOM requirement.
3. An `## Exports` section listing every public export with its signature and a short description of parameters and return value. Document exported types as well as functions/classes.
4. A `## Usage` section with a runnable code example that imports from `@lipemat/js-helpers`.
5. An optional `## Notes` section for caveats such as "requires a DOM" or "browser only".

Keep the prose concise, use single quotes in code samples, and match the existing helper Readmes in tone and layout.

## How to add a new helper
1. Create `src/<helper>/<helper>.ts` and implement the helper. Export only the public API. Reuse `Callback`/`Return` from `src/once/once.ts` for function-shape types where appropriate.
2. Use `.js` extensions on every relative import, including imports of other helpers (`'../once/once.js'`).
3. Add `export * from './<helper>/<helper>.js';` to `src/index.ts`. Confirm the new exports do not collide with existing barrel exports.
4. Write `src/<helper>/Readme.md` following the **How to document a helper** rules above.
5. Add a `jest/tests/<helper>.test.ts` suite that exercises the real implementation (never mock the subject under test).
6. Add the helper to the table in the root `README.md` with a one-line description linking to its `Readme.md`.
7. If the helper introduces a new runtime dependency, add it to `dependencies` in `package.json`. Dev-only tooling goes in `devDependencies`.
8. Run the full verification suite below.

## Documentation is mandatory
- You **must** update documentation after any change to a helper. This includes:
  - The helper's own `src/<helper>/Readme.md` when its API, parameters, return value, or behavior changes.
  - The root `README.md` helper table when a helper is added, removed, or renamed, or when its one-line description no longer fits.
  - This `AGENTS.md` if the conventions themselves change.
- A change that alters a helper's public API without a matching documentation update is considered incomplete.

## Conventions
- Single quotes, tabs for indentation, strict `===`, Yoda conditionals.
- No narration comments; comment only to clarify non-obvious logic.
- The default branch for this repository is `master`.

## Verifying changes
After code changes, verify without asking using:
1. `yarn validate-ts` — type-check with no emit.
2. `yarn lint` — ESLint via `@lipemat/eslint-config`.
3. `yarn test` — the Jest suite (jsdom environment).
4. `yarn build` — confirm the `tsc` emit to `dist` succeeds.
