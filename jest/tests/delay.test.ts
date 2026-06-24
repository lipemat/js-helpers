import {delay} from '../../src/delay/delay';
import {waitFor} from '@testing-library/dom';

describe( 'delay', () => {
	test( 'is a function', () => {
		expect( typeof delay ).toBe( 'function' );
	} );


	test( 'returns a promise', () => {
		expect( delay( 200 ) ).toBeInstanceOf( Promise );
	} );


	it( 'resolves after the given time', async () => {
		const start = Date.now();
		await delay( 201 );
		expect( Date.now() - start ).toBeGreaterThanOrEqual( 200 );
	} );


	it( 'Adds a delay of 200ms', async () => {
		jest.useFakeTimers();
		const mock = jest.fn();

		const withDelay = async () => {
			const delayPromise = delay( 200 );
			await new Promise( resolve => setTimeout( resolve, 100 ) );
			await delayPromise;
			mock();
		};
		withDelay();
		jest.advanceTimersByTime( 100 );
		expect( mock ).not.toHaveBeenCalled();
		await waitFor( () => expect( mock ).not.toHaveBeenCalled(), {
			timeout: 100,
		} );
		expect( mock ).not.toHaveBeenCalled();

		jest.advanceTimersByTime( 110 );
		await waitFor( () => expect( mock ).toHaveBeenCalledTimes( 1 ), {
			timeout: 100,
		} );
		expect( mock ).toHaveBeenCalledTimes( 1 );
	} );
} );
