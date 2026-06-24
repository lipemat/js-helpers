# once

Lodash-free `once`. Wrap a function so it only runs the first time; subsequent calls return the cached result.

## Exports

### `once( fn ): Return<T>`

- `fn: T` — function to run a single time.

Returns a function with the same signature that caches and returns the first result.

### `Callback` / `Return<T>` (types)

Shared function-shape types used by `once`, `debounce`, `throttle`, and `memoize`.

## Usage

```ts
import {once} from '@lipemat/js-helpers';

const init = once( () => expensiveSetup() );

init(); // runs expensiveSetup()
init(); // returns the first result, no re-run
```
