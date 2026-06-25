/**
 * Generate a random key of a given length.
 *
 * @version 1.0.0
 */
export function generateRandomKey( length: number = 10 ) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for ( let i = 0; i < length; i++ ) {
		result += characters.charAt( Math.floor( Math.random() * characters.length ) );
	}
	return result;
}


/**
 * Adds a leading slash to a URL if it doesn't already have one.
 *
 * @version 1.0.0
 */
export function addLeadingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return url?.replace( /^\/?/, '/' );
}


/**
 * Adds a trailing slash to a URL if it doesn't already have one.
 *
 * @version 1.0.0
 */
export function addTrailingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return url.replace( /\/?$/, '/' );
}


/**
 * Removes a leading slash from a URL if it has one.
 *
 * @version 1.0.0
 */
export function removeLeadingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return url.replace( /^\//, '' );
}

/**
 * Removes a trailing slash from a URL if it has one.
 *
 * @version 1.0.0
 */
export function removeTrailingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return url.replace( /\/$/, '' );
}
