# useAsync

React hook to call an async function and consume its result, tracking loading, success, and error states. Fires immediately by default, or can be deferred to fire on demand (e.g. an `onClick` handler).

## Exports

### `useAsync<T, A>( asyncFunction, immediate?, args? )`

Run `asyncFunction` and expose its result and status.

- `asyncFunction: ( args?: A ) => Promise<T>` — the async callback to execute.
- `immediate: boolean = true` — when `true`, runs on mount; otherwise call `execute` manually.
- `args?: AsyncArgs<A>` — optional arguments passed to the callback. Set `args.watch` to control the value the hook re-runs on.

Returns an object with `execute()`, `status`, `value`, `error`, and `loading`.

### `type Status`

`'idle' | 'pending' | 'success' | 'error'`.

### `type AsyncArgs<A>`

`A` extended with an optional `watch` value used as the re-run dependency.

## Usage

```ts
import {useAsync} from '@lipemat/js-helpers/react';

function Profile() {
	const {value, loading, error} = useAsync( () => fetch( '/api/me' ).then( r => r.json() ) );

	if ( loading ) {
		return 'Loading…';
	}
	if ( null !== error ) {
		return error;
	}
	return value?.name;
}
```

## Notes

Requires React (`>=18`) as a peer dependency.
