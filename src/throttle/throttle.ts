import type {Callback, Return} from '../once/once.js';

type Result<T extends Callback> = {
	( ...args: Parameters<T> ): ReturnType<T>;
	immediate: ( ...args: Parameters<T> ) => ReturnType<T>;
	cancel: () => void;
};

/**
 * Alternative to lodash throttle.
 *
 * - Additional support for `immediate` execution to bypass the wait time.
 * - Returns a promise to allow waiting for a completion of the throttled function.
 *
 * @version 1.0.1
 */
export function throttle<T extends Callback>( fn: T, wait = 300 ): Result<T> {
	let lastTime = 0;
	let timer: number | NodeJS.Timeout | undefined;
	let result: ReturnType<T>;

	const throttled = function( ...args: Parameters<T> ): Promise<ReturnType<T>> {
		const now = Date.now();
		const remaining = now - lastTime;

		if ( remaining >= wait ) {
			clearTimeout( timer );
			timer = undefined;
			lastTime = now;
			return fn( ...args );
		}

		if ( 'undefined' === typeof timer ) {
			timer = setTimeout( () => {
				lastTime = Date.now();
				result = fn( ...args );
				timer = undefined;
			}, wait - remaining );
		}

		return result;
	};

	// Immediate execution method.
	throttled.immediate = function( ...args: Parameters<T> ): Return<T> {
		clearTimeout( timer );
		lastTime = Date.now();
		return fn( ...args );
	};

	// Cancel method.
	throttled.cancel = function() {
		clearTimeout( timer );
	};

	return throttled as Result<T>;
}
