# memoize

Lodash-free memoization. Caches results of `fn` keyed by the first argument, or by a custom `resolver`.

## Exports

### `memoize( fn, resolver? )`

- `fn: T` — function whose results are cached.
- `resolver?: ( ...args ) => string` — derive a custom cache key. Defaults to the first argument.

Returns the memoized function with a `.cache` `Map` you can inspect or clear.

### `MemoizedFunction<T>` (type)

The returned function type, including the `cache: Map<string, ReturnType<T>>` property.

## Usage

```ts
import {memoize} from '@lipemat/js-helpers';

const slugify = memoize( ( value: string ) => value.toLowerCase().replace( /\s+/g, '-' ) );

slugify( 'Hello World' ); // computed
slugify( 'Hello World' ); // from cache
slugify.cache.clear();
```
