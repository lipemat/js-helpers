# dom-ready

Run a callback once the document has finished parsing. Logic borrowed from `@wordpress/dom-ready`.

## Exports

### `domReady( callback ): void`

Execute `callback` after `DOMContentLoaded`. If the document is already `interactive` or `complete`, the callback runs immediately. Does nothing when `document` is undefined (e.g. server-side).

- `callback: EventCallback` — function to run when the DOM is ready.

### `EventCallback` (type)

```ts
type EventCallback = ( this: Document | void, ev?: Event ) => void;
```

## Usage

```ts
import {domReady} from '@lipemat/js-helpers';

domReady( () => {
	console.log( 'DOM is ready' );
} );
```
