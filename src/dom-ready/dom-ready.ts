export type EventCallback = ( this: Document | void, ev?: Event ) => void;


/**
 * Fire a callback after the DOMContentLoaded event.
 * If called after the document is loaded, callback will be executed immediately.
 * Logic borrowed from `@wordpress/dom-ready`.
 *
 * @param {Function} callback Callback to execute.
 *
 * @version 1.0.0
 */
export function domReady( callback: EventCallback ) {
	if ( 'undefined' === typeof document ) {
		return;
	}
	if ( 'complete' === document.readyState || 'interactive' === document.readyState ) {
		return void callback();
	}

	document.addEventListener( 'DOMContentLoaded', () => callback() );
}
