import {csvExport} from '../../src/csvExport/csvExport';

function readBlob( blob: Blob ): Promise<string> {
	return new Promise( ( resolve, reject ) => {
		const reader = new FileReader();
		reader.onload = () => resolve( reader.result as string );
		reader.onerror = () => reject( reader.error );
		reader.readAsText( blob );
	} );
}

describe( 'csvExport', () => {
	let createObjectURL: jest.Mock;
	let originalCreateObjectURL: typeof URL.createObjectURL | undefined;
	let clickSpy: jest.SpyInstance;

	beforeEach( () => {
		createObjectURL = jest.fn( () => 'blob:mock-url' );
		originalCreateObjectURL = URL.createObjectURL;
		URL.createObjectURL = createObjectURL as unknown as typeof URL.createObjectURL;
		clickSpy = jest.spyOn( HTMLAnchorElement.prototype, 'click' ).mockImplementation( () => undefined );
	} );

	afterEach( () => {
		clickSpy.mockRestore();
		URL.createObjectURL = originalCreateObjectURL as typeof URL.createObjectURL;
	} );


	it( 'does nothing when there is no data', () => {
		csvExport( [], 'empty.csv' );
		expect( createObjectURL ).not.toHaveBeenCalled();
		expect( clickSpy ).not.toHaveBeenCalled();
	} );


	it( 'builds a csv with a header row from an array of objects', async () => {
		csvExport( [
			{
				name: 'John',
				city: 'NYC',
			},
			{
				name: 'Jane',
				city: 'LA',
			},
		], 'people.csv' );

		expect( createObjectURL ).toHaveBeenCalledTimes( 1 );
		expect( clickSpy ).toHaveBeenCalledTimes( 1 );

		const blob = createObjectURL.mock.calls[ 0 ][ 0 ] as Blob;
		expect( blob.type ).toContain( 'text/csv' );
		expect( await readBlob( blob ) ).toBe( 'name,city\nJohn,NYC\nJane,LA\n' );
	} );


	it( 'omits the header row for an array of arrays', async () => {
		csvExport( [
			[ 'John', 'NYC' ],
			[ 'Jane', 'LA' ],
		], 'people.csv' );

		const blob = createObjectURL.mock.calls[ 0 ][ 0 ] as Blob;
		expect( await readBlob( blob ) ).toBe( 'John,NYC\nJane,LA\n' );
	} );


	it( 'quotes values containing commas', async () => {
		csvExport( [ {
			name: 'Doe, John',
			city: 'NYC',
		} ], 'people.csv' );

		const blob = createObjectURL.mock.calls[ 0 ][ 0 ] as Blob;
		expect( await readBlob( blob ) ).toBe( 'name,city\n"Doe, John",NYC\n' );
	} );
} );

