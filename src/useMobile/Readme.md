# useMobile

React hook that reports whether the current client is a mobile device, updating on window resize. Uses the package's `isMobile` and `debounce` helpers.

## Exports

### `useMobile(): Mobile`

Returns `{ isMobile }`, kept in sync with the viewport via a debounced `resize` listener.

### `type Mobile`

`{ isMobile: boolean }`.

## Usage

```ts
import {useMobile} from '@lipemat/js-helpers';

function Layout() {
	const {isMobile} = useMobile();
	return isMobile ? <CompactNav /> : <FullNav />;
}
```

## Notes

Requires React (`>=18`) as a peer dependency. Requires `window`; intended for browser use. User-agent changes are not polled — only resize events update the state.
