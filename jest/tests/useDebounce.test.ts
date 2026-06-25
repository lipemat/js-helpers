import {act, renderHook} from '@testing-library/react';
import {useDebounce} from '../../src/useDebounce/useDebounce';

describe( 'useDebounce', () => {
	beforeEach( () => {
		jest.useFakeTimers();
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );


	it( 'should return the initial value immediately', () => {
		const {result} = renderHook( () => useDebounce( 'initial', 500 ) );
		expect( result.current ).toBe( 'initial' );
	} );


	it( 'should only update after the delay elapses', () => {
		const {result, rerender} = renderHook( ( {value} ) => useDebounce( value, 500 ), {
			initialProps: {value: 'a'},
		} );

		rerender( {value: 'b'} );
		expect( result.current ).toBe( 'a' );

		act( () => {
			jest.advanceTimersByTime( 499 );
		} );
		expect( result.current ).toBe( 'a' );

		act( () => {
			jest.advanceTimersByTime( 1 );
		} );
		expect( result.current ).toBe( 'b' );
	} );


	it( 'should reset the timer when the value keeps changing', () => {
		const {result, rerender} = renderHook( ( {value} ) => useDebounce( value, 500 ), {
			initialProps: {value: 'a'},
		} );

		rerender( {value: 'b'} );
		act( () => {
			jest.advanceTimersByTime( 400 );
		} );
		rerender( {value: 'c'} );
		act( () => {
			jest.advanceTimersByTime( 400 );
		} );
		expect( result.current ).toBe( 'a' );

		act( () => {
			jest.advanceTimersByTime( 100 );
		} );
		expect( result.current ).toBe( 'c' );
	} );


	it( 'should fire the callback with the debounced value', () => {
		const cb = jest.fn();
		const {rerender} = renderHook( ( {value} ) => useDebounce( value, 500, cb ), {
			initialProps: {value: 'a'},
		} );

		rerender( {value: 'b'} );
		act( () => {
			jest.advanceTimersByTime( 500 );
		} );
		expect( cb ).toHaveBeenCalledTimes( 1 );
		expect( cb ).toHaveBeenCalledWith( 'b' );
	} );
} );
