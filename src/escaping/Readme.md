# escaping

Decode HTML entities and strip HTML tags from a string. Taken nearly verbatim from Gutenberg's `@wordpress/html-entities`, with the input sanitized through [DOMPurify](https://github.com/cure53/DOMPurify).

## Exports

### `decodeEntities( html ): string`

Return `html` with HTML entities decoded. Strings without a `&` are returned unchanged. A reusable detached `<textarea>` is used for decoding.

- `html: string` — string that may contain HTML entities.

### `stripTags( html ): string`

Return `html` with all HTML tags removed while keeping the text content. Uses DOMPurify with no allowed tags or attributes.

- `html: string` — string that may contain HTML tags.

## Usage

```ts
import {decodeEntities, stripTags} from '@lipemat/js-helpers';

decodeEntities( 'Ben &amp; Jerry&#039;s' ); // "Ben & Jerry's"
stripTags( '<p>Hello <strong>world</strong></p>' ); // "Hello world"
```

## Notes

Requires a DOM (`document`); intended for browser use.
