import {noop} from '../../src/noop/noop';

describe( 'noop', () => {
	it( 'is a function', () => {
		expect( typeof noop ).toBe( 'function' );
	} );


	it( 'returns undefined', () => {
		expect( noop() ).toBeUndefined();
	} );


	it( 'does not throw when called with arguments', () => {
		// @ts-expect-error -- noop intentionally ignores all arguments.
		expect( () => noop( 1, 'two', {three: true} ) ).not.toThrow();
	} );
} );
