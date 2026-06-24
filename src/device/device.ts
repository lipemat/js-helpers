const breakPoint = 800;


/**
 * Detects if the user is on a desktop or mobile device.
 * - Desktop: Width greater than 800 px and not a mobile user agent.
 * - Mobile: Width less than 800 px or a mobile user agent.
 *
 * @see useMobile - For keeping track of mobile state in React components.
 *
 * @version 2.0.2
 */


export function isDesktop(): boolean {
	return window.innerWidth > breakPoint && ! hasMobileUserAgent();
}

export function isMobile(): boolean {
	return window.innerWidth < breakPoint || hasMobileUserAgent();
}

/**
 * Checks if the user agent is a mobile device.
 * - Checks if an HTTPS `userAgentData` API is available and if the `mobile` property is true.
 * - If not available, checks the `navigator.userAgent` string for common mobile identifiers.
 *
 * Modeled after the `wp_is_mobile()` function in WordPress but runs on the client side
 * to support:
 *  1. Edge page caching.
 *  2. Changes in emulation of the user agent during development.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
 * @link https://developer.wordpress.org/reference/functions/wp_is_mobile/
 */
export function hasMobileUserAgent(): boolean {
	const ua = navigator.userAgent;
	// @ts-expect-error TS2551 -- Not all browsers support userAgentData yet.
	const uaData = navigator.userAgentData ?? undefined;
	if ( 'undefined' !== typeof uaData && 'undefined' !== typeof uaData.mobile && Boolean( uaData.mobile ) ) {
		return true;
	} else if ( 'undefined' === typeof ua || '' === ua ) {
		return false;
	}
	return [ 'Mobile', 'Android', 'Silk/', 'Kindle', 'BlackBerry', 'Opera Mini', 'Opera Mobi' ].some( agent => ua.includes( agent ) );
}
