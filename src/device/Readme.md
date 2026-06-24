# device

Detect whether the current client is a desktop or mobile device. Modeled after WordPress' `wp_is_mobile()` but evaluated client-side so it works with edge page caching and user-agent emulation.

## Exports

### `isDesktop(): boolean`

`true` when the viewport is wider than 800px and the user agent is not mobile.

### `isMobile(): boolean`

`true` when the viewport is 800px or narrower, or the user agent is mobile.

### `hasMobileUserAgent(): boolean`

`true` when `navigator.userAgentData.mobile` is set, or the `navigator.userAgent` string matches a known mobile identifier.

## Usage

```ts
import {isDesktop, isMobile, hasMobileUserAgent} from '@lipemat/js-helpers';

if ( isMobile() ) {
	// Render the compact layout.
}
```

## Notes

Requires `window` and `navigator`; intended for browser use.
