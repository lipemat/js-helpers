import {renderHook} from '@testing-library/react';
import {useEffectOnChange} from '../../src/useEffectOnChange/useEffectOnChange';

describe( 'useEffectOnChange', () => {
	it( 'should not call the callback on initial render', () => {
		const callback = jest.fn();
		const {rerender} = renderHook( () => useEffectOnChange( callback, [] ) );

		expect( callback ).not.toHaveBeenCalled();

		rerender();
		expect( callback ).not.toHaveBeenCalled();
	} );


	it( 'should call the callback when dependencies change', () => {
		const callback = jest.fn();
		const {rerender} = renderHook( ( {deps} ) => useEffectOnChange( callback, deps ), {
			initialProps: {deps: [ 1 ]},
		} );

		expect( callback ).not.toHaveBeenCalled();

		rerender( {deps: [ 2 ]} );
		expect( callback ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'should call the callback when dependencies change to a different reference', () => {
		const callback = jest.fn();
		const firstObject = {value: 1};
		const secondObject = {value: 2};
		const {rerender} = renderHook( ( {deps} ) => useEffectOnChange( callback, deps ), {
			initialProps: {deps: [ firstObject ]},
		} );

		expect( callback ).not.toHaveBeenCalled();

		rerender( {deps: [ secondObject ]} );
		expect( callback ).toHaveBeenCalledTimes( 1 );

		rerender( {deps: [ firstObject ]} );
		expect( callback ).toHaveBeenCalledTimes( 2 );

		rerender( {deps: [ firstObject ]} );
		expect( callback ).toHaveBeenCalledTimes( 2 );
	} );


	it( 'should not call the callback when dependencies remain the same', () => {
		const callback = jest.fn();
		const attributes = {
			taxonomy: 'category',
		};
		const {rerender} = renderHook( ( {deps} ) => useEffectOnChange( callback, deps ), {
			initialProps: {deps: [ attributes.taxonomy ]},
		} );

		expect( callback ).not.toHaveBeenCalled();

		rerender( {deps: [ attributes.taxonomy ]} );
		expect( callback ).not.toHaveBeenCalled();
	} );


	it( 'should properly handle cleanup when a callback returns a destructor', () => {
		const destructor = jest.fn();
		const callback = jest.fn( () => destructor );

		const {rerender, unmount} = renderHook( ( {deps} ) => useEffectOnChange( callback, deps ), {
			initialProps: {deps: [ 1 ]},
		} );

		expect( callback ).not.toHaveBeenCalled();

		rerender( {deps: [ 2 ]} );
		expect( callback ).toHaveBeenCalledTimes( 1 );
		expect( destructor ).toHaveBeenCalledTimes( 0 );

		unmount();
		expect( destructor ).toHaveBeenCalledTimes( 1 );
	} );


	it( 'should not call destructor on initial render', () => {
		const destructor = jest.fn();
		const callback = jest.fn( () => destructor );

		renderHook( () => useEffectOnChange( callback, [] ) );

		expect( callback ).not.toHaveBeenCalled();
		expect( destructor ).not.toHaveBeenCalled();
	} );


	it( 'should not fire if another use changes dependency', () => {
		const callback = jest.fn();
		const callback2 = jest.fn();
		const {rerender: hook1} = renderHook( ( {deps} ) => useEffectOnChange( callback, deps ), {
			initialProps: {deps: [ 1 ]},
		} );
		const {rerender: hook2} = renderHook( ( {deps} ) => useEffectOnChange( callback2, deps ), {
			initialProps: {deps: [ '' ]},
		} );

		expect( callback ).not.toHaveBeenCalled();

		hook1( {deps: [ 2 ]} );
		expect( callback ).toHaveBeenCalledTimes( 1 );

		hook2( {deps: [ '' ]} );
		hook2( {deps: [ 'changed' ]} );
		expect( callback ).toHaveBeenCalledTimes( 1 );
		hook1( {deps: [ 3 ]} );
		expect( callback ).toHaveBeenCalledTimes( 2 );

		expect( callback2 ).toHaveBeenCalledTimes( 1 );
	} );
} );
