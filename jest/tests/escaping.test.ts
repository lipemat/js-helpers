import {decodeEntities, stripTags} from '../../src/escaping/escaping';

describe( 'decodeEntities', () => {
	it( 'returns the string unchanged when there are no entities', () => {
		expect( decodeEntities( 'no entities here' ) ).toBe( 'no entities here' );
	} );


	it( 'decodes a named ampersand entity', () => {
		expect( decodeEntities( 'Tom &amp; Jerry' ) ).toBe( 'Tom & Jerry' );
	} );


	it( 'decodes angle bracket entities', () => {
		expect( decodeEntities( '&lt;div&gt;' ) ).toBe( '<div>' );
	} );


	it( 'decodes quote entities', () => {
		expect( decodeEntities( '&quot;quoted&quot;' ) ).toBe( '"quoted"' );
	} );
} );


describe( 'stripTags', () => {
	it( 'returns the string unchanged when there are no tags', () => {
		expect( stripTags( 'no tags here' ) ).toBe( 'no tags here' );
	} );


	it( 'strips a single tag while keeping the text', () => {
		expect( stripTags( '<p>Hello</p>' ) ).toBe( 'Hello' );
	} );


	it( 'strips nested tags while keeping the text', () => {
		expect( stripTags( '<p>Hello <strong>world</strong></p>' ) ).toBe( 'Hello world' );
	} );


	it( 'removes attributes along with tags', () => {
		expect( stripTags( '<a href="https://example.com" onclick="alert(1)">link</a>' ) ).toBe( 'link' );
	} );


	it( 'removes script tags and their content', () => {
		expect( stripTags( 'before<script>alert(1)</script>after' ) ).toBe( 'beforeafter' );
	} );
} );
