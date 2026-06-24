import DOMPurify from 'dompurify';

const {sanitize} = DOMPurify;

/**
 * @version 1.0.8
 */

export type CsvData = Array<{ [ column: string ]: number | string } | Array<number | string>>

/**
 * Generate a csv file and trigger a download of a said file.
 *
 * @author Mat Lipe
 * @since September, 2019
 *
 * @param {Array<Object>} data
 * @param {string}        fileName
 *
 * @return {void}
 */
export function csvExport( data: CsvData, fileName: string ): void {
	const csv = convertArrayOfObjectsToCSV( data );
	if ( null === csv ) {
		return;
	}

	const blob = new Blob( [ csv ], {type: 'text/csv;charset=utf-8;'} );
	const link = document.createElement( 'a' );

	if ( link.download !== undefined ) {
		link.setAttribute( 'href', sanitize( URL.createObjectURL( blob ) ) );
		link.setAttribute( 'download', sanitize( fileName ) );
		link.style.visibility = 'hidden';
		document.body.appendChild( link );
		link.click();
		document.body.removeChild( link );
	}
}

/**
 * Convert an array of objects|array to a string representation of a csv file.
 *
 * @param data
 */
function convertArrayOfObjectsToCSV( data: CsvData ): string | null {
	if ( null === data || ( 0 === data.length ) ) {
		return null;
	}

	const keys: string[] = Object.keys( data[ 0 ] );

	let result = '';
	if ( '0' !== keys[ 0 ] ) {
		result += keys.join( ',' );
		result += '\n';
	}

	data.forEach( item => {
		keys.forEach( ( key: string, i: number ) => {
			if ( i > 0 ) {
				result += ',';
			}
			// @ts-expect-error
			let innerValue = item[ key ]?.toString().replace( /"/g, '""' ) ?? '';
			if ( innerValue.search( /([",\n])/g ) >= 0 ) {
				innerValue = '"' + innerValue + '"';
			}
			result += decodeHtml( innerValue );
		} );
		result += '\n';
	} );

	return result;
}

/**
 * Convert any HTML special characters to their string version,
 * so they may be encoded via `encodeURI`.
 *
 * @param {string} html
 *
 * @return {string}
 */
function decodeHtml( html: string ): string {
	const txt = document.createElement( 'textarea' );
	txt.innerHTML = sanitize( html );
	return txt.value;
}
