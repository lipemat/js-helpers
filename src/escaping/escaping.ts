import DOMPurify from 'dompurify';

let _decodeTextArea: HTMLTextAreaElement;

/**
 * Taken nearly verbatim from the Gutenberg package.
 *
 * Added to the helpers in case we are
 * not loading wp-html-entities on the front-end.
 *
 * @notice We likely are loading wp-html-entities unless a special project.
 *
 * @see @wordpress/html-entities
 *
 * @version 1.0.5
 *
 * @link https://github.com/WordPress/gutenberg/blob/d5915916abc45e6682f4bdb70888aa41e98aa395/packages/html-entities/src/index.js#L14
 * @param  html
 */
export function decodeEntities( html: string ) {
	// Not a string, or no entities to decode.
	if ( -1 === html.indexOf( '&' ) ) {
		return html;
	}

	// Create a textarea for decoding entities, that we can reuse.
	if ( undefined === _decodeTextArea ) {
		if ( undefined !== document.implementation ) {
			_decodeTextArea = document.implementation
				.createHTMLDocument( '' )
				.createElement( 'textarea' );
		} else {
			_decodeTextArea = document.createElement( 'textarea' );
		}
	}

	_decodeTextArea.innerHTML = DOMPurify.sanitize( html );
	const decoded = _decodeTextArea.textContent;
	_decodeTextArea.innerHTML = '';
	return ( decoded );
}

/**
 * Strip all HTML tags from a string.
 *
 * Uses DOMPurify to remove every tag while keeping the text content.
 *
 * @param html
 */
export function stripTags( html: string ): string {
	return DOMPurify.sanitize( html, {ALLOWED_TAGS: [], ALLOWED_ATTR: []} );
}
