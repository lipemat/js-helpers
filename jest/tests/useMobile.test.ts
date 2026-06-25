import {act, renderHook} from '@testing-library/react';
import {useMobile} from '../../src/useMobile/useMobile';

function setWidth( width: number ): void {
	Object.defineProperty( window, 'innerWidth', {
		configurable: true,
		writable: true,
		value: width,
	} );
}

describe( 'useMobile', () => {
	beforeEach( () => {
		jest.useFakeTimers();
		setWidth( 1024 );
	} );

	afterEach( () => {
		jest.useRealTimers();
		setWidth( 1024 );
	} );


	it( 'should initialize with the desktop state on a wide viewport', () => {
		setWidth( 1024 );
		const {result} = renderHook( () => useMobile() );
		expect( result.current.isMobile ).toBe( false );
	} );


	it( 'should initialize with the mobile state on a narrow viewport', () => {
		setWidth( 500 );
		const {result} = renderHook( () => useMobile() );
		expect( result.current.isMobile ).toBe( true );
	} );


	it( 'should update the state when the window is resized to mobile', () => {
		setWidth( 1024 );
		const {result} = renderHook( () => useMobile() );
		expect( result.current.isMobile ).toBe( false );

		act( () => {
			setWidth( 500 );
			window.dispatchEvent( new Event( 'resize' ) );
			jest.advanceTimersByTime( 50 );
		} );
		expect( result.current.isMobile ).toBe( true );
	} );


	it( 'should update the state when the window is resized to desktop', () => {
		setWidth( 500 );
		const {result} = renderHook( () => useMobile() );
		expect( result.current.isMobile ).toBe( true );

		act( () => {
			setWidth( 1024 );
			window.dispatchEvent( new Event( 'resize' ) );
			jest.advanceTimersByTime( 50 );
		} );
		expect( result.current.isMobile ).toBe( false );
	} );


	it( 'should remove the event listener on unmount', () => {
		const removeEventListenerSpy = jest.spyOn( window, 'removeEventListener' );
		const {unmount} = renderHook( () => useMobile() );
		unmount();
		expect( removeEventListenerSpy ).toHaveBeenCalledWith( 'resize', expect.any( Function ) );
		removeEventListenerSpy.mockRestore();
	} );
} );
