# JS Helpers

<p>
    <a href="https://www.npmjs.com/package/@lipemat/js-helpers">
        <img alt="npm" src="https://img.shields.io/npm/v/@lipemat/js-helpers.svg">
    </a>
    <img alt="node" src="https://img.shields.io/node/v/@lipemat/js-helpers.svg">
</p>

Framework-agnostic TypeScript helper utilities used across [@lipemat](https://github.com/lipemat) projects.

Each helper is small, dependency-light, and tree-shakeable. The package ships compiled ESM (`.js`) plus type declarations (`.d.ts`).

## Installation

```bash
yarn add @lipemat/js-helpers
# or
npm install @lipemat/js-helpers
```

## Usage

Every helper is importable from the package root:

```ts
import {debounce, hexToRGB, domReady} from '@lipemat/js-helpers';
```

## Helpers

| Helper                                                     | Description                                           | Docs                                         |
|------------------------------------------------------------|-------------------------------------------------------|----------------------------------------------|
| `classNameAmend`, `sanitizeCssModuleClass`                 | Manipulate CSS class name strings.                    | [classes](./src/classes/Readme.md)           |
| `hexToRGB`, `RGBToHex`, `getLightness`                     | Convert between hex/RGB colors and measure lightness. | [colors](./src/colors/Readme.md)             |
| `csvExport`                                                | Generate a CSV file and trigger a browser download.   | [csvExport](./src/csvExport/Readme.md)       |
| `getFormattedDate`                                         | Format a `Date` using `mm`/`dd`/`yyyy` tokens.        | [date](./src/date/Readme.md)                 |
| `debounce`                                                 | Lodash-free debounce with `immediate` and `cancel`.   | [debounce](./src/debounce/Readme.md)         |
| `delay`                                                    | Resolve a promise after a set amount of time.         | [delay](./src/delay/Readme.md)               |
| `isDesktop`, `isMobile`, `hasMobileUserAgent`              | Detect desktop vs mobile clients.                     | [device](./src/device/Readme.md)             |
| `domReady`                                                 | Run a callback once the DOM is ready.                 | [dom-ready](./src/dom-ready/Readme.md)       |
| `ErrorWithFields`                                          | `Error` subclass carrying per-field messages.         | [error](./src/error/Readme.md)               |
| `decodeEntities`                                           | Decode HTML entities in a string.                     | [escaping](./src/escaping/Readme.md)         |
| `injectScript`                                             | Inject an external script into the DOM once.          | [injectScript](./src/injectScript/Readme.md) |
| `memoize`                                                  | Lodash-free memoization with an inspectable cache.    | [memoize](./src/memoize/Readme.md)           |
| `noop`                                                     | A no-operation function.                              | [noop](./src/noop/Readme.md)                 |
| `keysOf`, `entriesOf`                                      | Type-safe `Object.keys`/`Object.entries`.             | [objects](./src/objects/Readme.md)           |
| `once`                                                     | Run a function a single time and cache the result.    | [once](./src/once/Readme.md)                 |
| `generateRandomKey`, `add`/`removeLeading`/`TrailingSlash` | Random keys and slash management.                     | [string](./src/string/Readme.md)             |
| `throttle`                                                 | Lodash-free throttle with `immediate` and `cancel`.   | [throttle](./src/throttle/Readme.md)         |
| `getUrlParam`, `addQueryArgs`                              | Read and append URL query arguments.                  | [url](./src/url/Readme.md)                   |
| `useAsync`                                                 | Run an async function and track its loading state.    | [useAsync](./src/useAsync/Readme.md)         |
| `useDebounce`                                              | Debounce a value for use as an effect dependency.     | [useDebounce](./src/useDebounce/Readme.md)   |
| `useDebouncedInput`                                        | Manage an input value alongside a debounced copy.     | [useDebouncedInput](./src/useDebouncedInput/Readme.md) |
| `useEffectOnce`                                            | Run an effect a single time on mount.                 | [useEffectOnce](./src/useEffectOnce/Readme.md) |
| `useEffectOnChange`                                        | Run an effect on dependency change, skipping mount.   | [useEffectOnChange](./src/useEffectOnChange/Readme.md) |
| `useMobile`                                                | Track whether the client is a mobile device.          | [useMobile](./src/useMobile/Readme.md)       |

> The `use*` helpers are React hooks and require React `>=18` (declared as an optional peer dependency). All other helpers are framework-agnostic.

## Development

```bash
yarn install      # install dependencies
yarn build        # compile src -> dist via tsc
yarn watch        # compile in watch mode
yarn validate-ts  # type-check with no emit
yarn lint         # ESLint (@lipemat/eslint-config)
yarn test         # Jest (jsdom)
```

See [AGENTS.md](./AGENTS.md) for conventions on adding and documenting helpers.

## License

MIT © Mat Lipe
