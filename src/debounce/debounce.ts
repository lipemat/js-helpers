import type {Callback, Return} from '../once/once.js';

type Result<T extends Callback> = {
	( ...args: Parameters<T> ): Promise<ReturnType<T>>;
	immediate: ( ...args: Parameters<T> ) => ReturnType<T>;
	cancel: () => void;
};


/**
 * Alternative to lodash debounce.
 *
 * - Additional support for `immediate` execution to bypass the wait time.
 * - Returns a promise to allow waiting for a completion of the debounced function.
 *
 * @version 1.4.1
 */
export function debounce<T extends Callback>( fn: T, wait = 300 ): Result<T> {
	let timer: number | NodeJS.Timeout;
	let promise: Promise<ReturnType<T>> | null = null;
	let resolve: ( value: ReturnType<T> ) => void;

	const debounced = function( ...args: Parameters<T> ): Promise<ReturnType<T>> {
		clearTimeout( timer );
		timer = setTimeout( () => {
			resolve( fn( ...args ) );
		}, wait );

		return promise ??= new Promise<ReturnType<T>>( res => {
			resolve = res;
		} );
	};

	// Immediate execution method.
	debounced.immediate = function( ...args: Parameters<T> ): Return<T> {
		clearTimeout( timer );
		return fn( ...args );
	};

	// Cancel method.
	debounced.cancel = function() {
		clearTimeout( timer );
		promise = null;
	};

	return debounced as Result<T>;
}
