import {debounce} from '../../src/debounce/debounce';

describe( 'debounce', () => {
	it( 'should debounce the function', () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const debounced = debounce( callback, 100 );
		debounced();
		debounced();
		debounced();
		jest.advanceTimersByTime( 50 );
		expect( callback ).not.toHaveBeenCalled();
		jest.advanceTimersByTime( 40 );
		expect( callback ).not.toHaveBeenCalled();
		jest.advanceTimersByTime( 10 );
		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'should debounce the function with immediate execution', () => {
		jest.useFakeTimers();
		const callback = jest.fn().mockReturnValue( true );
		const debounced = debounce( callback, 100 );
		const result = debounced.immediate();
		expect( result ).toBe( true );
		debounced();
		debounced();
		jest.advanceTimersByTime( 50 );
		expect( callback ).toHaveBeenCalledTimes( 1 );
		jest.advanceTimersByTime( 40 );
		expect( callback ).toHaveBeenCalledTimes( 1 );

		debounced();
		jest.advanceTimersByTime( 10 );
		expect( callback ).toHaveBeenCalledTimes( 1 );
		jest.advanceTimersByTime( 100 );
		expect( callback ).toHaveBeenCalledTimes( 2 );
		debounced.immediate();
		expect( callback ).toHaveBeenCalledTimes( 3 );
	} );


	it( 'Should wait for the debounced function to complete', async () => {
		jest.useRealTimers();
		const callback = jest.fn().mockReturnValue( true );
		const debounced = debounce( callback, 50 );
		const promise = debounced();
		debounced();
		const second = debounced();
		expect( callback ).not.toHaveBeenCalled();

		const result = await promise;
		expect( callback ).toHaveBeenCalledTimes( 1 );
		expect( result ).toBe( true );

		const secondResult = await second;
		expect( callback ).toHaveBeenCalledTimes( 1 );
		expect( secondResult ).toBe( true );

		const promiseCallback = async () => {
			// delay for 100ms
			await new Promise( resolve => setTimeout( resolve, 100 ) );
			return 'from-promised-callback';
		};
		const debouncedPromise = debounce( promiseCallback, 50 );
		const promiseResult = await debouncedPromise();
		expect( promiseResult ).toBe( 'from-promised-callback' );
	} );


	it( 'Should cancel the debounced function', () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const debounced = debounce( callback, 100 );
		debounced();
		debounced();
		debounced.cancel();
		jest.advanceTimersByTime( 100 );
		expect( callback ).not.toHaveBeenCalled();
	} );
} );
