import {domReady} from '../../src/dom-ready/dom-ready';

describe( 'domReady', () => {
	it( 'calls the callback immediately when the document is already ready', () => {
		// jsdom reports a `complete` readyState by default.
		const callback = jest.fn();
		domReady( callback );
		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'waits for DOMContentLoaded when the document is still loading', () => {
		const readyState = jest.spyOn( document, 'readyState', 'get' ).mockReturnValue( 'loading' );
		const callback = jest.fn();

		domReady( callback );
		expect( callback ).not.toHaveBeenCalled();

		document.dispatchEvent( new Event( 'DOMContentLoaded' ) );
		expect( callback ).toHaveBeenCalledTimes( 1 );

		readyState.mockRestore();
	} );
} );
