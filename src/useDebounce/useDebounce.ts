import {useEffect, useState} from 'react';

/**
 * Debounce a value to only change within a given delay.
 *
 * Used to have a value to pass as a `useEffect` dependency
 * only fire after the value has stopped updating for a
 * specified period.
 *
 * @example ```jsx
 *          const [searchTerm, setSearchTerm] = useState("");
 *          const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *          useEffect( () => {}, debouncedSearchTerm );
 *          ```
 *
 * @example ```jsx
 *          const [searchTerm, setSearchTerm] = useState("");
 *          const [query, setQuery] = useState("");
 *          const debouncedSearchTerm = useDebounce(searchTerm, 500, search =>
 *          setQuery( search ) );
 *          ```
 *
 * @see useDebouncedInput
 *
 * @version 1.1.4
 *
 * @param {any}      value - Value to track changes to and return.
 * @param {number}   delay - Number in milliseconds.
 * @param {Function} cb    - Optional callback to fire when the value changes.
 */
export function useDebounce<T>( value: T, delay: number, cb?: ( value: T ) => void ): T {
	const [ debouncedValue, setDebouncedValue ] = useState( value );

	useEffect( () => {
		const handler = setTimeout( () => {
			setDebouncedValue( value );
			if ( typeof cb !== 'undefined' ) {
				cb( value );
			}
		}, delay );
		return () => {
			clearTimeout( handler );
		};
		// eslint-disable-next-line -- We don't want to fire when the `cb` changes.
	}, [ value, delay ] );
	return debouncedValue;
}
