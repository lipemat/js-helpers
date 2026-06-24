# throttle

Lodash-free throttle. Ensures `fn` runs at most once per `wait` ms.

## Exports

### `throttle( fn, wait? )`

- `fn: T` — function to throttle.
- `wait?: number` — minimum delay between calls in milliseconds, defaults to `300`.

Returns a throttled function plus:

- `.immediate( ...args )` — run `fn` right away, bypassing the wait.
- `.cancel()` — cancel a pending trailing call.

## Usage

```ts
import {throttle} from '@lipemat/js-helpers';

const onScroll = throttle( () => update(), 100 );
window.addEventListener( 'scroll', onScroll );

onScroll.immediate(); // run now
onScroll.cancel(); // cancel a pending call
```
