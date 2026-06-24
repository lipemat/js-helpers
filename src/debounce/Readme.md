# debounce

Lodash-free debounce. Delays calling `fn` until `wait` ms have passed since the last call, returning a promise that resolves with the result.

## Exports

### `debounce( fn, wait? )`

- `fn: T` — function to debounce.
- `wait?: number` — delay in milliseconds, defaults to `300`.

Returns a debounced function that resolves a `Promise` with the result, plus:

- `.immediate( ...args )` — run `fn` right away, bypassing the wait.
- `.cancel()` — cancel a pending call.

## Usage

```ts
import {debounce} from '@lipemat/js-helpers';

const save = debounce( ( value: string ) => persist( value ), 500 );

await save( 'hello' ); // resolves after 500ms of inactivity
save.immediate( 'now' ); // runs synchronously
save.cancel(); // cancel a pending call
```
