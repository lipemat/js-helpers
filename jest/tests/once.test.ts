import {once} from '../../src/once/once';

describe( 'once', () => {
	it( 'should return a function', () => {
		expect( typeof once( () => {
		} ) ).toBe( 'function' );
	} );


	it( 'should only call the function once', () => {
		const mock = jest.fn();
		const fn = once( mock );

		fn();
		fn();
		fn();

		expect( mock ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'should return the same value', () => {
		const mock = jest.fn();
		const fn = once( mock );

		expect( fn() ).toBe( fn() );
	} );


	it( 'should invoke `func` once', () => {
		let count = 0;
		const resultFunc = once( () => ++count );
		expect( resultFunc() ).toBe( 1 );
		expect( count ).toBe( 1 );
	} );


	it( 'should ignore recursive calls', () => {
		let count = 0;

		const resultFunc = once( () => {
			resultFunc();
			return ++count;
		} );

		expect( resultFunc() ).toBe( 1 );
		expect( count ).toBe( 1 );
	} );


	it( 'should not throw more than once', () => {
		const resultFunc = once( () => {
			throw new Error();
		} );

		expect( resultFunc ).toThrow();
		expect( resultFunc ).not.toThrow();
	} );
} );
