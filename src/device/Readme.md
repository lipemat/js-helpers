# device

Detect whether the current client is a desktop or mobile device. Modeled after WordPress' `wp_is_mobile()` but evaluated client-side so it works with edge page caching and user-agent emulation.

The breakpoint defaults to 800px. Projects change it with `setMobileBreakpoint`.

## Exports

### `isDesktop(): boolean`

`true` when the viewport is wider than the configured breakpoint and the user agent is not mobile.

### `isMobile(): boolean`

`true` when the viewport is the configured breakpoint or narrower, or the user agent is mobile.

### `setMobileBreakpoint( width: number ): void`

Set the breakpoint used by `isDesktop`, `isMobile`, and `useMobile`. Call during bootstrap, before anything reads the device state. Pass `DEFAULT_BREAKPOINT` to restore the default.

### `getMobileBreakpoint(): number`

The breakpoint currently in use.

### `DEFAULT_BREAKPOINT`

The default breakpoint, `800`.

### `hasMobileUserAgent(): boolean`

`true` when `navigator.userAgentData.mobile` is set, or the `navigator.userAgent` string matches a known mobile identifier. Not affected by the breakpoint.

## Usage

```ts
import {isDesktop, isMobile, hasMobileUserAgent} from '@lipemat/js-helpers';

if ( isMobile() ) {
	// Render the compact layout.
}
```

Change the breakpoint for the whole project during bootstrap:

```ts
import {setMobileBreakpoint} from '@lipemat/js-helpers';

setMobileBreakpoint( 1024 );
```

Restore the default, such as between tests:

```ts
import {DEFAULT_BREAKPOINT, setMobileBreakpoint} from '@lipemat/js-helpers';

setMobileBreakpoint( DEFAULT_BREAKPOINT );
```

## Notes

Requires `window` and `navigator`; intended for browser use.

The breakpoint is module state, so a `setMobileBreakpoint` call after render does not re-render mounted React components. Set it once during bootstrap.

A mobile user agent reports mobile at any viewport width, whatever the breakpoint.
