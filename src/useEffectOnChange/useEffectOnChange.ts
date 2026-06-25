import {type DependencyList, type EffectCallback, useEffect, useRef} from 'react';

/**
 * Works the same as `useEffect` except it will not
 * fire when a component is first rendered and will
 * only fire if a dependency changes.
 *
 * @version 1.1.0
 */
export function useEffectOnChange( callback: EffectCallback, deps: DependencyList ): void {
	const didMount = useRef( false );

	useEffect( () => {
		if ( didMount.current ) {
			return callback();
		}
		didMount.current = true;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps );
}
