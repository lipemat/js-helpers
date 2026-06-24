import type {Callback, Return} from '../once/once.js';

type Resolver<T extends Callback> = ( ...args: Parameters<T> ) => string;

export type MemoizedFunction<T extends Callback> = Return<T> & {
	cache: Map<string, ReturnType<T>>;
};

/**
 * Similar to lodash memoize but without requiring lodash.
 *
 * @version 1.1.3
 */
export function memoize<T extends Callback>( fn: T, resolver?: Resolver<T> ): MemoizedFunction<T> {
	const memoized = function( ...args: Parameters<T> ): ReturnType<Callback> {
		const key = resolver ? resolver( ...args ) : args[ 0 ];
		if ( memoized.cache.has( key ) ) {
			return memoized.cache.get( key );
		}

		const result = fn( ...args );
		memoized.cache = memoized.cache.set( key, result );
		return result;
	};
	memoized.cache = new Map();
	return memoized;
}
