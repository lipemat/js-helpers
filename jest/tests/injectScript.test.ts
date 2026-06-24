import {injectScript} from '../../src/injectScript/injectScript';

describe( 'injectScript', () => {
	afterEach( () => {
		jest.restoreAllMocks();
	} );


	it( 'appends a script to the head and resolves on load', async () => {
		const appendChild = jest.spyOn( document.head, 'appendChild' );
		const promise = injectScript( 'https://example.com/head-script.js' );

		const script = appendChild.mock.calls[ 0 ][ 0 ] as HTMLScriptElement;
		expect( script.tagName ).toBe( 'SCRIPT' );
		expect( script.src ).toBe( 'https://example.com/head-script.js' );
		expect( script.async ).toBe( false );

		script.dispatchEvent( new Event( 'load' ) );
		await expect( promise ).resolves.toBe( 'Loaded: https://example.com/head-script.js' );
	} );


	it( 'appends to the body when `inBody` is true', () => {
		const appendChild = jest.spyOn( document.body, 'appendChild' );
		injectScript( 'https://example.com/body-script.js', true );

		const script = appendChild.mock.calls[ 0 ][ 0 ] as HTMLScriptElement;
		expect( script.tagName ).toBe( 'SCRIPT' );
		expect( script.src ).toBe( 'https://example.com/body-script.js' );
	} );


	it( 'only injects a given script once', () => {
		const appendChild = jest.spyOn( document.head, 'appendChild' );
		const first = injectScript( 'https://example.com/memoized-script.js' );
		const second = injectScript( 'https://example.com/memoized-script.js' );

		expect( first ).toBe( second );
		expect( appendChild ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'rejects when the script errors', async () => {
		const appendChild = jest.spyOn( document.head, 'appendChild' );
		const promise = injectScript( 'https://example.com/error-script.js' );

		const script = appendChild.mock.calls[ 0 ][ 0 ] as HTMLScriptElement;
		script.dispatchEvent( new Event( 'error' ) );
		await expect( promise ).rejects.toBe( 'Error loading script.' );
	} );
} );
