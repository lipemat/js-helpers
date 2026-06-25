import {renderHook} from '@testing-library/react';
import {useEffectOnce} from '../../src/useEffectOnce/useEffectOnce';

describe( 'useEffectOnce', () => {
	it( 'should call the callback once on mount', () => {
		const callback = jest.fn();
		renderHook( () => useEffectOnce( callback ) );
		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'should not call the callback again on rerender', () => {
		const callback = jest.fn();
		const {rerender} = renderHook( () => useEffectOnce( callback ) );

		rerender();
		rerender();
		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );
} );
