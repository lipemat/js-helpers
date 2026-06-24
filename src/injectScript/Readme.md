# injectScript

Inject an external script into the DOM once. Memoized by `src`, so repeated calls with the same URL reuse the same promise instead of adding the script again.

## Exports

### `injectScript( src, inBody? )`

- `src: string` — URL of the script to inject.
- `inBody?: boolean` — append to `<body>` instead of `<head>`. Defaults to `false`.

Returns a `Promise` that resolves when the script loads and rejects on error or abort.

## Usage

```ts
import {injectScript} from '@lipemat/js-helpers';

await injectScript( 'https://example.com/widget.js' );
// Calling again with the same URL reuses the first promise.
await injectScript( 'https://example.com/widget.js' );
```

## Notes

Requires a DOM (`document`); intended for browser use.
