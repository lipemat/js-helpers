import {entriesOf, keysOf} from '../../src/objects/objects';

describe( 'objects', () => {
	describe( 'keysOf', () => {
		it( 'returns the keys of an object', () => {
			const obj = {
				one: 1,
				two: 2,
				three: 3,
			};
			expect( keysOf( obj ) ).toEqual( [ 'one', 'two', 'three' ] );
		} );


		it( 'returns an empty array for an empty object', () => {
			expect( keysOf( {} ) ).toEqual( [] );
		} );
	} );


	describe( 'entriesOf', () => {
		it( 'returns the entries of an object', () => {
			const obj = {
				one: 1,
				two: 'second',
			};
			expect( entriesOf( obj ) ).toEqual( [
				[ 'one', 1 ],
				[ 'two', 'second' ],
			] );
		} );


		it( 'returns an empty array for an empty object', () => {
			expect( entriesOf( {} ) ).toEqual( [] );
		} );
	} );
} );
