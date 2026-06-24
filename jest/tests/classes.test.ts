import {sanitizeCssModuleClass} from '../../src/classes/classes';

describe( 'Classes helper', () => {
	describe( 'sanitizeCssModuleClass', () => {
		const CASES = [
			{
				input: 'foo',
				output: '.foo',
			},
			{
				input: 'foo @bar',
				output: '.foo.@bar',
			},
			{
				input: ' foo bar other',
				output: '.foo.bar.other',
			},
			{
				input: ' foo  bar ',
				output: '.foo.bar',
			},
			{
				input: '.foo   bar ',
				output: '.foo.bar',
			},
			{
				input: ' foo   bar  ',
				output: '.foo.bar',
			},
		];


		it.each( CASES )( 'Sanitizes CSS Module class from PHP {input}.', ( {
			input, output,
		} ) => {
			expect( sanitizeCssModuleClass( input ) ).toBe( output );
		} );
	} );
} );
