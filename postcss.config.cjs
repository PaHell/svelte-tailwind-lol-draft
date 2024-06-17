const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const config = {
	syntax: 'postcss',
	plugins: [
		require('postcss-import'),
		require('tailwindcss/nesting')(require('postcss-nesting')),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		require('tailwindcss'),
		//But others, like autoprefixer, need to run after,
		require('autoprefixer'),
		!dev &&
			require('cssnano')({
				preset: 'default'
			}),
		require('postcss-preset-env')({
			features: { 'nesting-rules': false }
		}),
	]
};

module.exports = config;
