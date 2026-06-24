export interface ErrorField<T extends { [ field: string ]: string }> {
	code: keyof T;
	data?: object | string | boolean | number;
	message: string;

	additional_errors?: Array<ErrorField<T>>;
}

export type Fields<T> = {
	[field in keyof T]?: string;
};

/**
 * Use in place from the default Error handler to include
 * information about form fields which caused the errors.
 *
 * Translates `WP_Error` responses from REST API into
 * field name and their corresponding messages.
 *
 * @version 1.2.1
 */
export class ErrorWithFields<T extends { [ field: string ]: string }> extends Error {
	public fields: Fields<T>;

	constructor( error: ErrorField<T> ) {
		const errors = [ error ];
		if ( undefined !== error.additional_errors ) {
			errors.push( ...error.additional_errors );
		}

		super( errors.map( er => er.message ).join( ' ' ) );

		this.name = 'ErrorWithData';
		this.fields = {};
		errors.forEach( field => {
			this.fields[ this.translate( field ).code ] = field.message;
		} );
	}

	translate( error: ErrorField<T> ): ErrorField<T> {
		error.code = error.code
			.toString()
			.replace( 'user_name', 'username' )
			.replace( 'user_email', 'email' )
			.replace( 'rest_user_invalid_email', 'email' );

		return error;
	}
}
