import config from '@lipemat/eslint-config';

export default [
	...config,
	{
		// Tests live outside the build's `tsconfig.json`, so type-aware rules need their own project.
		files: [ 'jest/**/*.ts' ],
		languageOptions: {
			parserOptions: {
				project: './tsconfig.eslint.json',
			},
		},
	},
	{
		// Ignore built output and generated files.
		ignores: [ 'dist/*', '**/*.js', '**/*.mjs' ],
	},
];
