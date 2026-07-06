# url

Read and append URL query arguments. The query-string helpers are adapted nearly verbatim from the `@wordpress/url` package and maintained here to avoid a dependency on `@wordpress/url`. `getUrlParam` sanitizes input through [DOMPurify](https://github.com/cure53/DOMPurify).

## Exports

### `getUrlParam( parameter, defaultValue? ): string | null`

Return the value of `parameter` from the current `window.location.search`, or `defaultValue` (default `''`) when it is absent.

### `getQueryArg( url, arg ): QueryArgParsed | undefined`

Return a single query argument of `url`, or `undefined` when it is absent.

### `getQueryArgs( url ): QueryArgObject`

Return an object of every query argument of `url`. Returns an empty object when the URL is invalid or has no querystring. Nested/array parameters (e.g. `foo[bar]=1`) are parsed into nested structures.

### `getQueryString( url ): string | undefined`

Return the query string portion of `url` (without the leading `?`), or `undefined` when there is none.

### `addQueryArgs( url?, args? ): string`

Append `args` to `url` as a querystring and return the resulting URL. Existing query arguments are merged with (and overridden by) `args`. When `url` is omitted only the resulting querystring is returned.

- `url?: string` — base URL.
- `args?: QueryArgObject` — parameters to append, defaults to `{}`.

### `getFragment( url ): string | undefined`

Return the fragment portion of `url` (including the leading `#`), or `undefined` when there is none.

### `buildQueryString( data ): string`

Generate an RFC 3986 URL-encoded query string from `data` (spaces encoded as `%20`). Behaves equivalently to PHP's `http_build_query`.

### Types

- `QueryArgObject` — `{ [key: string]: string | number | boolean | Array<string | number | boolean> | QueryArgObject }`.
- `QueryArgParsed` — `string | string[] | QueryArgObject`.
- `QueryArgs` — `{ [name: string]: string | number | QueryArgs }`.

## Usage

```ts
import {getUrlParam, addQueryArgs, getQueryArgs} from '@lipemat/js-helpers';

getUrlParam( 'page', '1' ); // current ?page value or '1'
addQueryArgs( 'https://example.com', {page: 2, sort: 'name'} );
// 'https://example.com?page=2&sort=name'
getQueryArgs( 'https://example.com?foo=bar&bar=baz' );
// { foo: 'bar', bar: 'baz' }
```

## Notes

`getUrlParam` requires `window`; intended for browser use.
