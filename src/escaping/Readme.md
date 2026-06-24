# escaping

Decode HTML entities in a string. Taken nearly verbatim from Gutenberg's `@wordpress/html-entities`, with the input sanitized through [DOMPurify](https://github.com/cure53/DOMPurify).

## Exports

### `decodeEntities( html ): string`

Return `html` with HTML entities decoded. Strings without a `&` are returned unchanged. A reusable detached `<textarea>` is used for decoding.

- `html: string` — string that may contain HTML entities.

## Usage

```ts
import {decodeEntities} from '@lipemat/js-helpers';

decodeEntities( 'Ben &amp; Jerry&#039;s' ); // "Ben & Jerry's"
```

## Notes

Requires a DOM (`document`); intended for browser use.
