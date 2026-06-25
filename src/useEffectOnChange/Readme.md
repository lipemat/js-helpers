# useEffectOnChange

React hook that works like `useEffect` but skips the initial render, only running its callback when a dependency changes. Supports returning a destructor for cleanup, just like `useEffect`.

## Exports

### `useEffectOnChange( callback, deps ): void`

- `callback: EffectCallback` — the effect to run on dependency change; may return a cleanup function.
- `deps: DependencyList` — the dependencies to watch.

## Usage

```ts
import {useEffectOnChange} from '@lipemat/js-helpers';

function Filter( {taxonomy} ) {
	useEffectOnChange( () => {
		refetch( taxonomy );
	}, [ taxonomy ] );
}
```

## Notes

Requires React (`>=18`) as a peer dependency.
