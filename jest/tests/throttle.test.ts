import {throttle} from '../../src/throttle/throttle';

describe( 'throttle', () => {
	it( 'should throttle the function', () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const throttled = throttle( callback, 100 );
		throttled();
		throttled();
		throttled();
		jest.advanceTimersByTime( 50 );
		throttled();
		expect( callback ).toHaveBeenCalledTimes( 1 );
		jest.advanceTimersByTime( 40 );
		expect( callback ).toHaveBeenCalledTimes( 1 );
		throttled();
		jest.advanceTimersByTime( 10 );
		expect( callback ).toHaveBeenCalledTimes( 2 );

		jest.advanceTimersByTime( 100 );
		expect( callback ).toHaveBeenCalledTimes( 2 );

		throttled();
		expect( callback ).toHaveBeenCalledTimes( 3 );
	} );

	it( 'should throttle the function with immediate execution', () => {
		jest.useFakeTimers();
		const callback = jest.fn().mockReturnValue( true );
		const throttled = throttle( callback, 100 );
		throttled();
		expect( callback ).toHaveBeenCalledTimes( 1 );
		const result = throttled.immediate();
		expect( result ).toBe( true );
		throttled();
		throttled();
		expect( callback ).toHaveBeenCalledTimes( 2 );

		jest.advanceTimersByTime( 50 );
		expect( callback ).toHaveBeenCalledTimes( 2 );
		jest.advanceTimersByTime( 50 );
		expect( callback ).toHaveBeenCalledTimes( 3 );
	} );


	it( 'Should cancel the throttled function', () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const throttled = throttle( callback, 100 );
		throttled();
		expect( callback ).toHaveBeenCalledTimes( 1 );
		throttled.cancel();
		jest.advanceTimersByTime( 110 );
		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );
} );
