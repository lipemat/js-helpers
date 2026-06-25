# useDebouncedInput

React hook that manages an input value alongside a debounced copy of it. Returns the live value, its setter, and the debounced value in a single tuple.

## Exports

### `useDebouncedInput<T>( defaultValue, delay?, cb? ): UseDebouncedInput<T>`

- `defaultValue: T` — the initial value.
- `delay: number = 500` — debounce delay in milliseconds.
- `cb?: ( value: T ) => void` — optional callback fired with the value once the delay elapses.

Returns `[ value, setValue, debouncedValue ]`.

### `type UseDebouncedInput<T>`

`[ value: T, setter: ( value: T ) => void, debouncedValue: T ]`.

## Usage

```ts
import {useDebouncedInput} from '@lipemat/js-helpers/react';

function Search() {
	const [ term, setTerm, debouncedTerm ] = useDebouncedInput( '', 500 );

	useEffect( () => {
		// Fires 500ms after the user stops typing.
	}, [ debouncedTerm ] );

	return <input value={term} onChange={e => setTerm( e.target.value )} />;
}
```

## Notes

Requires React (`>=18`) as a peer dependency.
