import config from '@lipemat/eslint-config';

export default [
	...config,
	{
		// Ignore built output and generated files.
		ignores: [ 'dist/*', '**/*.js', '**/*.mjs' ],
	},
];
