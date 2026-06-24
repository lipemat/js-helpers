import {memoize} from '../memoize/memoize.js';

/**
 * Inject a script into the DOM.
 *
 * May be called multiple times and will ony inject the script once.
 *
 * @param {string}  $src    - URL of the script.
 * @param {boolean} $inBody - Put in body tag instead of head
 *
 * @version 1.2.1
 *
 * @return {Promise}
 */
export const injectScript = memoize( ( src, inBody: boolean = false ) => {
	return new Promise( ( resolve, reject ) => {
		const script = document.createElement( 'script' );
		script.async = false;
		script.src = src;
		script.addEventListener( 'load', () => resolve( 'Loaded: ' + src ) );
		script.addEventListener( 'error', () => reject( 'Error loading script.' ) );
		script.addEventListener( 'abort', () =>
			reject( 'Script loading aborted.' ),
		);
		if ( inBody ) {
			document.body.appendChild( script );
		} else {
			document.head.appendChild( script );
		}
	} );
} );
