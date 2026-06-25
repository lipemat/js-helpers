import {useEffect, useState} from 'react';
import {debounce} from '../debounce/debounce.js';
import {isMobile} from '../device/device.js';

/**
 * A custom hook to determine if the current device is a mobile device.
 *
 * - Changes the state when the window is resized.
 * - Does not currently detect user agent changes as they are rare and require polling.
 *
 * @version 1.0.0
 */

export type Mobile = {
	isMobile: boolean;
}

export function useMobile(): Mobile {
	const [ isMobileDevice, setIsMobileDevice ] = useState( () => isMobile() );

	useEffect( () => {
		const handleResize = debounce( () => {
			setIsMobileDevice( isMobile() );
		}, 50 );
		window.addEventListener( 'resize', handleResize );

		return () => {
			window.removeEventListener( 'resize', handleResize );
		};
	}, [] );

	return {isMobile: isMobileDevice};
}
