import {useEffect, useState} from 'react';

export type UseDebouncedInput<T> = [ value: T, setter: ( value: T ) => void, debouncedValue: T ];

/**
 * Debounce a value to only change within a given delay.
 *
 * Used to have a value to pass as a `useEffect` dependency
 * only fire after the value has stopped updating for a
 * specified period.
 *
 * @example ```jsx
 *          const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebounce(searchTerm, 500);;
 *          useEffect( () => {}, debouncedSearchTerm );
 *          ```
 *
 * @example ```jsx
 *          const [query, setQuery] = useState("");
 *          const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebounce(searchTerm, 500, search =>
 *          setQuery( search ) );
 *
 * @version 1.1.0
 *
 * @note limited version of this available in the @wordpress/compose package.
 *
 * @param {any}      defaultValue - Value to track changes to and return.
 * @param {number}   delay - Number in milliseconds.
 * @param {Function} cb    - Optional callback to fire when the value changes.
 */
export function useDebouncedInput<T>( defaultValue: T, delay: number = 500, cb?: ( value: T ) => void ): UseDebouncedInput<T> {
	const [ input, setInput ] = useState<T>( defaultValue );
	const [ debouncedValue, setDebouncedValue ] = useState<T>( defaultValue );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebouncedValue( input );
			if ( typeof cb !== 'undefined' ) {
				cb( input );
			}
		}, delay );
		return () => {
			clearTimeout( handler );
		};
		// eslint-disable-next-line -- We don't want to fire when the `cb` changes.
	}, [ input, delay ] );

	return [ input, setInput, debouncedValue ];
}
