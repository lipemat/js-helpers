// eslint-disable-next-line -- Only being used for a shape to guarantee the other types.
export type Callback = ( ...args: Array<any> ) => any;
export type Return<T extends Callback> = ( ...args: Parameters<T> ) => ReturnType<T>

/**
 * Similar to lodash once but without requiring lodash.
 *
 * @version 1.0.2
 */
export function once<T extends Callback>( fn: T ): Return<T> {
	let result: ReturnType<T>;
	let called = false;

	return ( ...args: Parameters<T> ) => {
		if ( ! called ) {
			called = true;
			result = fn( ...args );
		}

		return result;
	};
}
