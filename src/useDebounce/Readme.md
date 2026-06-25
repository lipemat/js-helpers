# useDebounce

React hook that debounces a value so it only updates after the value has stopped changing for a given delay. Useful as a `useEffect` dependency that should not fire on every keystroke.

## Exports

### `useDebounce<T>( value, delay, cb? ): T`

Return a debounced copy of `value`.

- `value: T` — the value to track and return.
- `delay: number` — debounce delay in milliseconds.
- `cb?: ( value: T ) => void` — optional callback fired with the value once the delay elapses.

Returns the debounced value.

## Usage

```ts
import {useState} from 'react';
import {useDebounce} from '@lipemat/js-helpers/react';

function Search() {
	const [ term, setTerm ] = useState( '' );
	const debouncedTerm = useDebounce( term, 500 );

	useEffect( () => {
		// Fires 500ms after the user stops typing.
	}, [ debouncedTerm ] );
}
```

## Notes

Requires React (`>=18`) as a peer dependency. See `useDebouncedInput` for a variant that also manages the input state.
