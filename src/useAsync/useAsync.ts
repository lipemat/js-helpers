import {useCallback, useEffect, useState} from 'react';

export type Status = 'idle' | 'pending' | 'success' | 'error';

export type AsyncArgs<A extends object> = A & {
	// eslint-disable-next-line @typescript-eslint/no-restricted-types -- Could be anything.
	watch?: Readonly<unknown>;
}

type Return<T> = {
	execute: () => Promise<void>;
	status: Status;
	value: T;
	error: string | null;
	loading: boolean;
}

/**
 * Call an async function and use the value when ready.
 *
 * By default, will fire immediately, which may be configured via arguments
 * to be called later such as an onClick handler.
 *
 * @version 1.1.2
 *
 * @param {Promise} asyncFunction - Async callback.
 * @param {boolean} immediate     - Call right away.
 * @param           args          - Optional arguments to pass to the callback.
 */
export function useAsync<T, A extends object = never>(
	asyncFunction: ( args?: A ) => Promise<T>,
	immediate: boolean = true,
	args?: AsyncArgs<A>
): Return<T | null> {
	const [ status, setStatus ] = useState<Status>( 'idle' );
	const [ value, setValue ] = useState<T | null>( null );
	const [ error, setError ] = useState<string>( '' );

	const watch = args?.watch ?? true;

	const execute = useCallback( () => {
		setStatus( 'pending' );
		setValue( null );
		setError( '' );
		return asyncFunction( args )
			.then( ( response: T ) => {
				setValue( response );
				setStatus( 'success' );
			} )
			.catch( ( fail: Error ) => {
				setError( fail.toString() );
				setStatus( 'error' );
			} );
		//eslint-disable-next-line -- We only want to watch the "watch" value.
	}, [ asyncFunction, watch ] );

	/**
	 * Call execute if we want to fire it right away.
	 * Otherwise, execute can be called later, such as
	 * in an onClick handler.
	 */
	useEffect( () => {
		if ( immediate ) {
			execute();
		}
	}, [ execute, immediate ] );

	return {
		execute,
		status,
		value,
		error,
		loading: 'pending' === status || ( immediate && 'idle' === status ),
	};
}
