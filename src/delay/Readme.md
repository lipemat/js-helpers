# delay

Resolve a promise after a given amount of time. Useful for letting transitions finish while other work happens.

## Exports

### `delay( ms ): Promise<void>`

- `ms: number` — milliseconds to wait before resolving.

## Usage

```ts
import {delay} from '@lipemat/js-helpers';

const delayPromise = delay( 200 );
// Do other work while waiting.
await fetchPosts();
await delayPromise;
```
