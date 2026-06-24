# date

Format a `Date` object using a small set of tokens.

## Exports

### `getFormattedDate( date, format? ): string`

Return `date` formatted using the `format` string. Supported tokens are `mm` (month), `dd` (day), and `yyyy` (year). Defaults to `'mm/dd/yyyy'`.

- `date: Date` — the date to format.
- `format?: string` — token string, defaults to `'mm/dd/yyyy'`.

## Usage

```ts
import {getFormattedDate} from '@lipemat/js-helpers';

getFormattedDate( new Date( 2023, 0, 5 ) ); // '01/05/2023'
getFormattedDate( new Date( 2023, 0, 5 ), 'yyyy-mm-dd' ); // '2023-01-05'
```
