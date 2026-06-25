# useEffectOnce

React hook that works like `useEffect` but runs its callback a single time on mount and never requires an exhaustive dependency list.

## Exports

### `useEffectOnce( callback ): void`

- `callback: () => void` — the effect to run once on mount.

## Usage

```ts
import {useEffectOnce} from '@lipemat/js-helpers';

function Analytics() {
	useEffectOnce( () => {
		trackPageView();
	} );
}
```

## Notes

Requires React (`>=18`) as a peer dependency.
