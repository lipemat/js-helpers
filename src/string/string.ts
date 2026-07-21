/**
 * Generate a random key of a given length.
 *
 * @version 1.0.1
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
 * @version 1.0.1
 */
export function addLeadingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return normalizePath( url.replace( /^\/?/, '/' ) );
}


/**
 * Adds a trailing slash to a URL if it doesn't already have one.
 *
 * @version 1.0.1
 */
export function addTrailingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return normalizePath( url.replace( /\/?$/, '/' ) );
}


/**
 * Removes a leading slash from a URL if it has one.
 *
 * @version 1.0.1
 */
export function removeLeadingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return normalizePath( url.replace( /^\//, '' ) );
}

/**
 * Removes a trailing slash from a URL if it has one.
 *
 * @version 1.0.1
 */
export function removeTrailingSlash( url: string ): string {
	const trimmedURL = url.trim();
	if ( '' === trimmedURL ) {
		return url;
	}
	return normalizePath( url.replace( /\/$/, '' ) );
}


/**
 * Normalize path separators by replacing backslashes with forward slashes.
 *
 * Replace Windows backslashes with forward slashes.
 */
export function normalizePath( path: string ): string {
	return path.replace( /\\/g, '/' );
}
