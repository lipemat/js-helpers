# objects

Type-safe wrappers around `Object.keys` and `Object.entries` that preserve key types.

> More robust versions are available from the `@lipemat/js-boilerplate-gutenberg` package.

## Exports

### `keysOf( obj ): Array<keyof T>`

Like `Object.keys` but typed as `Array<keyof T>` instead of `string[]`.

### `entriesOf( obj ): Array<[keyof T, T[keyof T]]>`

Like `Object.entries` but typed as `Array<[keyof T, T[keyof T]]>`.

## Usage

```ts
import {keysOf, entriesOf} from '@lipemat/js-helpers';

const config = {width: 100, label: 'box'};

keysOf( config ).forEach( key => {
	// key is 'width' | 'label'
} );

entriesOf( config ).forEach( ( [ key, value ] ) => {
	// fully typed key/value pair
} );
```
