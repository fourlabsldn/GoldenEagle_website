/**
Hidden dependencies:
	babel-preset-es2015-rollup
	babel-preset-react
	babel-plugin-transform-async-to-generator
	babel-plugin-external-helpers-2
 */

// ============================================================================
// Transpile ES7 react code into ES5. Includes support for async await.
// ============================================================================
const path = require('path');
const taskName = path.parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const paths = require('./paths.json');
const buffer = require('vinyl-buffer');
const flatmap = require('gulp-flatmap');
const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const origin = paths.es6.src;
const destiny = paths.es6.dist;
const extenalDependencies = {
	react: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js',
	'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js',
};


gulp.task(taskName, () => {
	return gulp.src(origin)
		.pipe(flatmap(doTranspilation)) // call doTranspilation for each file
		.pipe(gulp.dest(destiny));
});

function doTranspilation(stream, file) {
	const fileName = path.parse(file.path).base;
	return rollup({
		entry: file.path,
		sourceMap: true,
		// Treat these imports as external dependencies and
		// load them from the given paths
		external: Object.keys(extenalDependencies),
		paths: extenalDependencies,
		// Let's use AMD format to serve our files to the front-end
		format: 'amd',
		plugins: [
			// Import modules with jsnext:main
			nodeResolve({	jsnext: true, main: true }),
			// Allow importing commonjs modules
			commonjs(),
			// Transpile our code to ES5
			babel({
				exclude: 'node_modules/**',
				babelrc: false,
				plugins: ['transform-async-to-generator', 'external-helpers-2'],
				presets: ['es2015-rollup', 'react'],
			}),
			// TODO: Change this from 'development' to 'production' during production
			replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		],
	})
	// point to the entry file.
	.pipe(source(fileName))
	// buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
	.pipe(buffer())
	// tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
	.pipe(sourcemaps.init({ loadMaps: true }))
	// Further modify the file here if needed
	// write the sourcemap alongside the output file.
	.pipe(sourcemaps.write('.'));
}
