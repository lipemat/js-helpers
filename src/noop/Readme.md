# noop

A no-operation function. Lodash-free replacement for `lodash.noop`. Useful as a default callback.

## Exports

### `noop(): void`

Does nothing.

## Usage

```ts
import {noop} from '@lipemat/js-helpers';

function setup( {onChange = noop} = {} ) {
	onChange();
}
```
