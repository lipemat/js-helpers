/**
 * Jest configuration.
 *
 * Uses babel-jest with the TypeScript preset so tests run against the
 * `src` files directly. The `moduleNameMapper` strips the `.js` extension
 * from relative imports so NodeNext-style specifiers resolve to the `.ts`
 * source during testing.
 */
module.exports = {
	testEnvironment: 'jsdom',
	roots: [
		'<rootDir>/jest/tests',
	],
	transform: {
		'^.+\\.[tj]sx?$': [ 'babel-jest', {
			presets: [
				[ '@babel/preset-env', {targets: {node: 'current'}} ],
				'@babel/preset-typescript',
			],
		} ],
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
};
