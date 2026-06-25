import {act, renderHook, waitFor} from '@testing-library/react';
import {useAsync} from '../../src/useAsync/useAsync';

describe( 'useAsync', () => {
	it( 'should resolve a value and report success when immediate', async () => {
		const asyncFn = jest.fn( () => Promise.resolve( 'done' ) );
		const {result} = renderHook( () => useAsync( asyncFn ) );

		expect( result.current.loading ).toBe( true );
		expect( result.current.status ).toBe( 'pending' );

		await waitFor( () => expect( result.current.status ).toBe( 'success' ) );

		expect( result.current.value ).toBe( 'done' );
		expect( result.current.error ).toBe( '' );
		expect( result.current.loading ).toBe( false );
		expect( asyncFn ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'should not run until execute is called when not immediate', async () => {
		const asyncFn = jest.fn( () => Promise.resolve( 'later' ) );
		const {result} = renderHook( () => useAsync( asyncFn, false ) );

		expect( asyncFn ).not.toHaveBeenCalled();
		expect( result.current.status ).toBe( 'idle' );
		expect( result.current.loading ).toBe( false );

		await act( async () => {
			await result.current.execute();
		} );

		expect( asyncFn ).toHaveBeenCalledTimes( 1 );
		expect( result.current.status ).toBe( 'success' );
		expect( result.current.value ).toBe( 'later' );
	} );


	it( 'should capture the error when the callback rejects', async () => {
		const asyncFn = jest.fn( () => Promise.reject( new Error( 'boom' ) ) );
		const {result} = renderHook( () => useAsync( asyncFn ) );

		await waitFor( () => expect( result.current.status ).toBe( 'error' ) );

		expect( result.current.error ).toBe( 'Error: boom' );
		expect( result.current.value ).toBeNull();
		expect( result.current.loading ).toBe( false );
	} );


	it( 'should pass arguments to the callback', async () => {
		const asyncFn = jest.fn( ( args?: {id: number} ) => Promise.resolve( args?.id ?? 0 ) );
		const {result} = renderHook( () => useAsync( asyncFn, true, {id: 5} ) );

		await waitFor( () => expect( result.current.status ).toBe( 'success' ) );

		expect( asyncFn ).toHaveBeenCalledWith( {id: 5} );
		expect( result.current.value ).toBe( 5 );
	} );
} );
