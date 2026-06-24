/**
 * @version 1.1.0
 */

/**
 * Given a Date object, return the date in the provided format.
 * Limited to `mm`, `dd`, and `yyyy` formats.
 *
 */
export function getFormattedDate( date: Date, format: string = 'mm/dd/yyyy' ): string {
	const year = date.getFullYear();

	let month = ( 1 + date.getMonth() ).toString();
	month = month.length > 1 ? month : '0' + month;

	let day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;

	return format
		.replace( 'mm', month )
		.replace( 'dd', day )
		.replace( 'yyyy', year.toString() );
}
