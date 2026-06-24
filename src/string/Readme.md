# string

Small string helpers for random keys and slash management.

> More robust versions are available from the `@lipemat/js-boilerplate-gutenberg` package.

## Exports

### `generateRandomKey( length? ): string`

Return a random alphanumeric string. `length` defaults to `10`.

### `addLeadingSlash( url ): string`

Ensure `url` starts with a slash. Empty/whitespace input is returned unchanged.

### `addTrailingSlash( url ): string`

Ensure `url` ends with a slash. Empty/whitespace input is returned unchanged.

### `removeLeadingSlash( url ): string`

Remove a leading slash if present. Empty/whitespace input is returned unchanged.

### `removeTrailingSlash( url ): string`

Remove a trailing slash if present. Empty/whitespace input is returned unchanged.

## Usage

```ts
import {generateRandomKey, addTrailingSlash, removeLeadingSlash} from '@lipemat/js-helpers';

generateRandomKey(); // e.g. 'a8Kd0Lm2Qz'
addTrailingSlash( 'path/to' ); // 'path/to/'
removeLeadingSlash( '/path' ); // 'path'
```
