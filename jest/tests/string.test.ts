import {
	addLeadingSlash,
	addTrailingSlash,
	generateRandomKey,
	removeLeadingSlash,
	removeTrailingSlash,
} from '../../src/string/string';

describe( 'string', () => {
	describe( 'generateRandomKey', () => {
		it( 'generates a key of the default length of 10', () => {
			expect( generateRandomKey() ).toHaveLength( 10 );
		} );


		it( 'generates a key of the requested length', () => {
			expect( generateRandomKey( 25 ) ).toHaveLength( 25 );
		} );


		it( 'only uses alphanumeric characters', () => {
			expect( generateRandomKey( 100 ) ).toMatch( /^[A-Za-z0-9]+$/ );
		} );


		it( 'generates unique keys', () => {
			expect( generateRandomKey( 20 ) ).not.toBe( generateRandomKey( 20 ) );
		} );
	} );


	describe( 'addLeadingSlash', () => {
		it( 'adds a leading slash when missing', () => {
			expect( addLeadingSlash( 'foo/bar' ) ).toBe( '/foo/bar' );
		} );


		it( 'does not double a leading slash', () => {
			expect( addLeadingSlash( '/foo/bar' ) ).toBe( '/foo/bar' );
		} );


		it( 'returns the original value when empty', () => {
			expect( addLeadingSlash( '   ' ) ).toBe( '   ' );
		} );
	} );


	describe( 'addTrailingSlash', () => {
		it( 'adds a trailing slash when missing', () => {
			expect( addTrailingSlash( 'foo/bar' ) ).toBe( 'foo/bar/' );
		} );


		it( 'does not double a trailing slash', () => {
			expect( addTrailingSlash( 'foo/bar/' ) ).toBe( 'foo/bar/' );
		} );


		it( 'returns the original value when empty', () => {
			expect( addTrailingSlash( '' ) ).toBe( '' );
		} );
	} );


	describe( 'removeLeadingSlash', () => {
		it( 'removes a leading slash when present', () => {
			expect( removeLeadingSlash( '/foo/bar' ) ).toBe( 'foo/bar' );
		} );


		it( 'leaves the value untouched when no leading slash', () => {
			expect( removeLeadingSlash( 'foo/bar' ) ).toBe( 'foo/bar' );
		} );
	} );


	describe( 'removeTrailingSlash', () => {
		it( 'removes a trailing slash when present', () => {
			expect( removeTrailingSlash( 'foo/bar/' ) ).toBe( 'foo/bar' );
		} );


		it( 'leaves the value untouched when no trailing slash', () => {
			expect( removeTrailingSlash( 'foo/bar' ) ).toBe( 'foo/bar' );
		} );
	} );
} );
