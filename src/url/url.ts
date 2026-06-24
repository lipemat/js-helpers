import DOMPurify from 'dompurify';

/**
 * @notice More robust versions are available from the `@lipemat/js-boilerplate-gutenberg` package.
 *
 * @notice More URL helpers are available within `@wordpress/url` package
 *         when being used in the admin or when added as a dependency.
 */

/**
 * @see @lipemat/js-boilerplate-gutenberg{getQueryArg} for more robust version.
 */
export function getUrlParam(
	parameter: string,
	defaultValue: string = '',
): string | null {
	const urlParams = new URLSearchParams( DOMPurify.sanitize( window.location.search ) );

	if ( urlParams.has( parameter ) ) {
		return urlParams.get( parameter );
	}
	return defaultValue;
}

/**
 * @see @lipemat/js-boilerplate-gutenberg{addQueryArgs} for more robust version.
 */
export function addQueryArgs( url: string = '', args: { [ name: string ]: string | number } ) {
	const path = new URL( url );
	Object.keys( args ).forEach( arg => {
		path.searchParams.append( DOMPurify.sanitize( arg ), args[ arg ].toString() );
	} );

	return path.toString();
}
