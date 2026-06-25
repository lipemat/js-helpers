import {useEffect} from 'react';

/**
 * Works the same as `useEffect` except it will not
 * fire more than once and does not require exhaustive
 * dependencies to be listed.
 *
 * @param callback
 */
export function useEffectOnce( callback: () => void ): void {
	useEffect( () => {
		callback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );
}
