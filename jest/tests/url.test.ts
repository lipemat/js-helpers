import {addQueryArgs, getUrlParam} from '../../src/url/url';

describe( 'url', () => {
	describe( 'getUrlParam', () => {
		afterEach( () => {
			window.history.pushState( {}, '', '/' );
		} );


		it( 'returns the value of an existing parameter', () => {
			window.history.pushState( {}, '', '/?foo=bar&count=5' );
			expect( getUrlParam( 'foo' ) ).toBe( 'bar' );
			expect( getUrlParam( 'count' ) ).toBe( '5' );
		} );


		it( 'returns an empty string by default when the parameter is missing', () => {
			window.history.pushState( {}, '', '/?foo=bar' );
			expect( getUrlParam( 'missing' ) ).toBe( '' );
		} );


		it( 'returns the provided default value when the parameter is missing', () => {
			window.history.pushState( {}, '', '/?foo=bar' );
			expect( getUrlParam( 'missing', 'fallback' ) ).toBe( 'fallback' );
		} );
	} );


	describe( 'addQueryArgs', () => {
		it( 'appends the provided arguments to the url', () => {
			expect( addQueryArgs( 'https://example.com', {
				a: '1',
				b: 2,
			} ) ).toBe( 'https://example.com/?a=1&b=2' );
		} );


		it( 'keeps existing query arguments', () => {
			expect( addQueryArgs( 'https://example.com/?existing=yes', {added: 'true'} ) )
				.toBe( 'https://example.com/?existing=yes&added=true' );
		} );
	} );
} );
