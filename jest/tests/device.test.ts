import {isDesktop, isMobile} from '../../src/device/device';

// Mock the window.innerWidth property
const mockWindowInnerWidth = ( width: number ): void => {
	Object.defineProperty( window, 'innerWidth', {
		writable: true,
		configurable: true,
		value: width,
	} );
};

// Mock the navigator.userAgent property
const mockUserAgent = ( userAgent: string ): void => {
	Object.defineProperty( navigator, 'userAgent', {
		writable: true,
		configurable: true,
		value: userAgent,
	} );
};

// Mock the navigator.userAgentData property
const mockUserAgentData = ( mobile: boolean | undefined ): void => {
	if ( mobile === undefined ) {
		// @ts-expect-error - Deliberately setting userAgentData to undefined for testing
		navigator.userAgentData = undefined;
	} else {
		// @ts-expect-error - userAgentData is not fully typed in TS
		navigator.userAgentData = {mobile};
	}
};

describe( 'Device Helper Functions', () => {
	afterEach( () => {
		jest.clearAllMocks();
		mockWindowInnerWidth( 1024 );
		mockUserAgent( '' );
		mockUserAgentData( undefined );
	} );


	describe( 'isDesktop()', () => {
		it( 'should return true when width > 800 and not a mobile the user agent', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' );

			expect( isDesktop() ).toBe( true );
		} );

		it( 'should return false when width < 800', () => {
			mockWindowInnerWidth( 799 );
			mockUserAgent( 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' );

			expect( isDesktop() ).toBe( false );
		} );

		it( 'should return false when the user agent is mobile', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent(
				'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.' );

			expect( isDesktop() ).toBe( false );
		} );

		it( 'should return false when userAgentData indicates mobile', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( '' );
			mockUserAgentData( true );

			expect( isDesktop() ).toBe( false );
		} );
	} );


	describe( 'isMobile()', () => {
		it( 'should return true when width < 800', () => {
			mockWindowInnerWidth( 799 );
			mockUserAgent( 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent is mobile', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent(
				'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should check user agent event when mobile is false', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.' );
			mockUserAgentData( false );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains Android', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (Linux; Android 10; SM-G975F)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains Mobile', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; Mobile)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains Silk/', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (Linux; U; en-us; Silk/3.68)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains Kindle', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (X11; U; Linux armv7l; en-US) Kindle Fire' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains BlackBerry', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains Opera Mini', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Opera/9.80 (Android; Opera Mini/36.2.2254)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when the user agent contains Opera Mobi', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Opera/9.80 (Android 4.1.2; Linux; Opera Mobi/ADR-1411061201)' );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return true when userAgentData indicates mobile', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( '' );
			mockUserAgentData( true );

			expect( isMobile() ).toBe( true );
		} );

		it( 'should return false when width > 800 and not a mobile the user agent', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' );
			mockUserAgentData( false );

			expect( isMobile() ).toBe( false );
		} );

		it( 'should return false when the user agent is empty', () => {
			mockWindowInnerWidth( 1024 );
			mockUserAgent( '' );
			mockUserAgentData( false );

			expect( isMobile() ).toBe( false );
		} );
	} );
} );
