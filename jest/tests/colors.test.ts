import {getLightness} from '../../src/colors/colors';

describe( 'Colors helper', () => {
	test( 'getLightness', () => {
		expect( getLightness( '#000' ) ).toBe( 0 );
		expect( getLightness( '#fff' ) ).toBe( 0.93 );
		expect( getLightness( '#f00' ) ).toBe( 0.2 );
		expect( getLightness( '#0f0' ) ).toBe( 0.69 );
		expect( getLightness( '#00f' ) ).toBe( 0.05 );
	} );
} );
