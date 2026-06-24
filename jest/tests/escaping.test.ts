import {decodeEntities} from '../../src/escaping/escaping';

describe( 'decodeEntities', () => {
	it( 'returns the string unchanged when there are no entities', () => {
		expect( decodeEntities( 'no entities here' ) ).toBe( 'no entities here' );
	} );


	it( 'decodes a named ampersand entity', () => {
		expect( decodeEntities( 'Tom &amp; Jerry' ) ).toBe( 'Tom & Jerry' );
	} );


	it( 'decodes angle bracket entities', () => {
		expect( decodeEntities( '&lt;div&gt;' ) ).toBe( '<div>' );
	} );


	it( 'decodes quote entities', () => {
		expect( decodeEntities( '&quot;quoted&quot;' ) ).toBe( '"quoted"' );
	} );
} );
