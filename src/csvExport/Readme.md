# csvExport

Generate a CSV file in the browser and trigger a download. HTML entities in the data are decoded and values are sanitized with [DOMPurify](https://github.com/cure53/DOMPurify).

## Exports

### `csvExport( data, fileName ): void`

Build a CSV from `data` and prompt the browser to download it as `fileName`.

- `data: CsvData` — an array of row objects (keys become headers) or an array of arrays (no header row).
- `fileName: string` — download file name.

### `CsvData` (type)

```ts
type CsvData = Array<{ [ column: string ]: number | string } | Array<number | string>>;
```

## Usage

```ts
import {csvExport, type CsvData} from '@lipemat/js-helpers';

const data: CsvData = [
	{name: 'Jane', email: 'jane@example.com'},
	{name: 'John', email: 'john@example.com'},
];

csvExport( data, 'users.csv' );
```

## Notes

Requires a DOM (`document`, `Blob`, `URL.createObjectURL`); intended for browser use.
