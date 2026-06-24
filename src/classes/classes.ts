/**
 * Utility functions for manipulating CSS class names.
 *
 * @version 1.4.0
 */


/**
 * Add or remove a className from an existing string of classes.
 *
 * @param {string}  existing  - String of existing classes to work with.
 * @param {string}  className - Classname to add or remove
 * @param {boolean} add       - Either add or remove the class.
 *
 * @return {string} - The modified string of classes.
 */
export function classNameAmend( existing: string | undefined, className: string, add: boolean ): string {
	let classes: string[] = [];
	if ( undefined !== existing ) {
		classes = existing.split( ' ' );
	}
	if ( add ) {
		classes.push( className );
	} else {
		classes = classes.filter( _class => _class !== className );
	}
	return [ ...new Set( classes ) ].join( ' ' );
}

/**
 * Sanitize a CSS class name provided by PHP CSS module.
 *
 * - Removes any leading or trailing whitespace.
 * - Replaces any spaces with a single dot.
 * - Adds a leading dot if not present.
 *
 * @param {string} className - The class name to sanitize.
 *
 * @return {string} - The sanitized class name.
 */
export function sanitizeCssModuleClass( className: string | null ): string {
	if ( null === className ) {
		return '';
	}
	className = className.trim();
	className = className.replace( /\s+/g, '.' );
	if ( className.charAt( 0 ) !== '.' ) {
		className = '.' + className;
	}
	return className;
}
