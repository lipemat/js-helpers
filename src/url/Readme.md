# url

Read and append URL query arguments. Inputs are sanitized through [DOMPurify](https://github.com/cure53/DOMPurify).

> More robust versions are available from the `@lipemat/js-boilerplate-gutenberg` and `@wordpress/url` packages.

## Exports

### `getUrlParam( parameter, defaultValue? ): string | null`

Return the value of `parameter` from the current `window.location.search`, or `defaultValue` (default `''`) when it is absent.

### `addQueryArgs( url?, args ): string`

Append `args` to `url` as query parameters and return the resulting URL string.

- `url?: string` — base URL, defaults to `''`.
- `args: { [name: string]: string | number }` — parameters to append.

## Usage

```ts
import {getUrlParam, addQueryArgs} from '@lipemat/js-helpers';

getUrlParam( 'page', '1' ); // current ?page value or '1'
addQueryArgs( 'https://example.com', {page: 2, sort: 'name'} );
// 'https://example.com/?page=2&sort=name'
```

## Notes

`getUrlParam` requires `window`; intended for browser use.
