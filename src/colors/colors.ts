/**
 * Color Utilities
 *
 * @version 1.2.0
 */

export function hexToRGB( hex: string, alpha?: number ): string {
	if ( '#' !== hex[ 0 ] ) {
		return hex;
	}
	const {r, g, b} = convertHexToRGB( hex );

	if ( typeof alpha !== 'undefined' ) {
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
	}
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}


export function RGBToHex( rgb: string ): string {
	if ( '#' === rgb[ 0 ] ) {
		return rgb;
	}
	const colors = rgb.match(
		/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
	);
	return ( colors !== null ) && 4 === colors.length
		? '#' +
		( '0' + parseInt( colors[ 1 ], 10 ).toString( 16 ) ).slice( -2 ) +
		( '0' + parseInt( colors[ 2 ], 10 ).toString( 16 ) ).slice( -2 ) +
		( '0' + parseInt( colors[ 3 ], 10 ).toString( 16 ) ).slice( -2 )
		: '';
}

/**
 * Get the lightness of a color.
 *
 * > 0.5 is light, <= 0.5 is dark.
 */
export function getLightness( hexOrRGB: string ): number {
	const {r, g, b} = convertHexToRGB( hexOrRGB );
	return Number( ( ( ( 0.2126 * r ) + ( 0.7152 * g ) + ( 0.0722 * b ) ) / 255 ).toFixed( 2 ) );
}


function convertHexToRGB( hex: string ): { r: number, b: number, g: number } {
	// Already RGB, just convert to object.
	if ( hex.startsWith( 'rgb(' ) ) {
		const colors = hex.match(
			/^rgba?\(\s*(?<r>\d+)\s*,\s*(?<g>\d+)\s*,\s(?<b>\d+)(?:\s*,\s*[\d.]+)?\s*\)$/i,
		);
		const groups = colors?.groups;
		return {
			r: parseInt( groups?.r ?? '0', 10 ),
			g: parseInt( groups?.g ?? '0', 10 ),
			b: parseInt( groups?.b ?? '0', 10 ),
		};
	}


	if ( 4 === hex.length ) {
		let colors = hex.substring( 1 ).split( '' );
		colors = [
			colors[ 0 ],
			colors[ 0 ],
			colors[ 1 ],
			colors[ 1 ],
			colors[ 2 ],
			colors[ 2 ],
		];
		hex = colors.join( '' );
	}

	const r = parseInt( hex.slice( 1, 3 ), 16 ),
		g = parseInt( hex.slice( 3, 5 ), 16 ),
		b = parseInt( hex.slice( 5, 7 ), 16 );


	return {r, g, b};
}
