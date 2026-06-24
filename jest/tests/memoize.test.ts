import {memoize} from '../../src/memoize/memoize';

describe( 'memoize', () => {
	it( 'should memoize results based on the first argument given', () => {
		const memoized = memoize( ( a, b, c ) => {
			if ( a instanceof Array ) {
				return b + c;
			}
			return a + b + c;
		} );

		expect( memoized( 1, 2, 3 ) ).toBe( 6 );
		expect( memoized( 1, 3, 5 ) ).toBe( 6 );

		const array = [ true ];
		expect( memoized( array, 4, 3 ) ).toBe( 7 );
		expect( memoized( array, 9, 3 ) ).toBe( 7 );
		expect( memoized( [ 8 ], 4, 3 ) ).toBe( 7 );
	} );


	it( 'should support a `resolver`', () => {
		const fn = function( a: number, b: number, c: number ): string {
			return ( a + b + c ).toString();
		};
		const memoized = memoize( fn, fn );

		expect( parseInt( memoized( 1, 2, 3 ) ) ).toBe( 6 );
		expect( parseInt( memoized( 1, 3, 5 ) ) ).toBe( 9 );
	} );


	it( 'should return the same object instance', () => {
		const memoized = memoize( ( ...a: [ string ] ) => ( {a} ) );
		const first = memoized( '' );
		const second = memoized( '' );
		expect( first ).toBe( second );

		const third = memoized( 'foo' );
		expect( third ).not.toBe( first );
		const fourth = memoized( 'foo' );
		expect( third ).toBe( fourth );

		const fifth = memoized( '' );
		expect( fifth ).toBe( first );
	} );
} );
