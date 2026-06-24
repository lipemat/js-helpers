import {ErrorWithFields} from '../../src/error/error';

type FormFields = {
	username: string;
	email: string;
};

describe( 'ErrorWithFields', () => {
	it( 'extends the native Error', () => {
		const error = new ErrorWithFields<FormFields>( {
			code: 'username',
			message: 'Username is required',
		} );
		expect( error ).toBeInstanceOf( Error );
		expect( error.name ).toBe( 'ErrorWithData' );
	} );


	it( 'uses the message as the error message', () => {
		const error = new ErrorWithFields<FormFields>( {
			code: 'username',
			message: 'Username is required',
		} );
		expect( error.message ).toBe( 'Username is required' );
		expect( error.fields ).toEqual( {username: 'Username is required'} );
	} );


	it( 'merges additional errors into the message and fields', () => {
		const error = new ErrorWithFields<FormFields>( {
			code: 'username',
			message: 'Username is required',
			additional_errors: [ {
				code: 'email',
				message: 'Email is invalid',
			} ],
		} );
		expect( error.message ).toBe( 'Username is required Email is invalid' );
		expect( error.fields ).toEqual( {
			username: 'Username is required',
			email: 'Email is invalid',
		} );
	} );


	it( 'translates WordPress style field codes', () => {
		const error = new ErrorWithFields<FormFields>( {
			code: 'user_name' as keyof FormFields,
			message: 'Bad username',
			additional_errors: [ {
				code: 'rest_user_invalid_email' as keyof FormFields,
				message: 'Bad email',
			} ],
		} );
		expect( error.fields ).toEqual( {
			username: 'Bad username',
			email: 'Bad email',
		} );
	} );
} );
