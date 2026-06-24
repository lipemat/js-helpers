# classes

Utilities for manipulating CSS class name strings.

## Exports

### `classNameAmend( existing, className, add ): string`

Add or remove a single class name from a space-separated string of classes. Duplicates are removed.

- `existing: string | undefined` — current class string.
- `className: string` — class to add or remove.
- `add: boolean` — `true` to add, `false` to remove.

### `sanitizeCssModuleClass( className ): string`

Normalize a CSS class name produced by a PHP CSS module: trims whitespace, converts inner spaces to dots, and ensures a leading dot. Returns `''` for `null`.

## Usage

```ts
import {classNameAmend, sanitizeCssModuleClass} from '@lipemat/js-helpers';

classNameAmend( 'a b', 'c', true ); // 'a b c'
classNameAmend( 'a b c', 'b', false ); // 'a c'

sanitizeCssModuleClass( 'card active' ); // '.card.active'
```
