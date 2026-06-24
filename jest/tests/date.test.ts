import {getFormattedDate} from '../../src/date/date';

describe( 'date', () => {
	describe( 'getFormattedDate', () => {
		it( 'formats a date using the default format', () => {
			expect( getFormattedDate( new Date( 2020, 0, 5 ) ) ).toBe( '01/05/2020' );
		} );


		it( 'zero pads the month and day', () => {
			expect( getFormattedDate( new Date( 2019, 8, 9 ) ) ).toBe( '09/09/2019' );
		} );


		it( 'does not pad two digit month and day', () => {
			expect( getFormattedDate( new Date( 2021, 11, 25 ) ) ).toBe( '12/25/2021' );
		} );


		it( 'supports a custom format', () => {
			expect( getFormattedDate( new Date( 2022, 2, 4 ), 'yyyy-mm-dd' ) ).toBe( '2022-03-04' );
		} );
	} );
} );
