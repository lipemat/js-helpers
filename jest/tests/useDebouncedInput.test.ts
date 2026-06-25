import {act, renderHook} from '@testing-library/react';
import {useDebouncedInput} from '../../src/useDebouncedInput/useDebouncedInput';

describe( 'useDebouncedInput', () => {
	beforeEach( () => {
		jest.useFakeTimers();
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );


	it( 'should return the default value and a setter', () => {
		const {result} = renderHook( () => useDebouncedInput( 'start', 500 ) );
		const [ value, setter, debounced ] = result.current;
		expect( value ).toBe( 'start' );
		expect( typeof setter ).toBe( 'function' );
		expect( debounced ).toBe( 'start' );
	} );


	it( 'should update the live value immediately and the debounced value after the delay', () => {
		const {result} = renderHook( () => useDebouncedInput( 'start', 500 ) );

		act( () => {
			result.current[ 1 ]( 'changed' );
		} );
		expect( result.current[ 0 ] ).toBe( 'changed' );
		expect( result.current[ 2 ] ).toBe( 'start' );

		act( () => {
			jest.advanceTimersByTime( 500 );
		} );
		expect( result.current[ 2 ] ).toBe( 'changed' );
	} );


	it( 'should default the delay to 500ms', () => {
		const {result} = renderHook( () => useDebouncedInput( 'start' ) );

		act( () => {
			result.current[ 1 ]( 'changed' );
		} );
		act( () => {
			jest.advanceTimersByTime( 499 );
		} );
		expect( result.current[ 2 ] ).toBe( 'start' );
		act( () => {
			jest.advanceTimersByTime( 1 );
		} );
		expect( result.current[ 2 ] ).toBe( 'changed' );
	} );


	it( 'should fire the callback with the debounced value', () => {
		const cb = jest.fn();
		const {result} = renderHook( () => useDebouncedInput( 'start', 500, cb ) );

		act( () => {
			result.current[ 1 ]( 'changed' );
		} );
		act( () => {
			jest.advanceTimersByTime( 500 );
		} );
		expect( cb ).toHaveBeenCalledTimes( 1 );
		expect( cb ).toHaveBeenCalledWith( 'changed' );
	} );
} );
