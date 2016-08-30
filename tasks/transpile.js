// ============================================================================
// Transpile ES7 code into ES5. Includes support for async await.
// ============================================================================

const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const rollup = require('gulp-rollup');
const foreach = require('gulp-foreach');
const paths = require('./paths.json');

const origin = paths.es6.src;
const destiny = paths.es6.dist;

gulp.task(taskName, () => {
	return gulp.src(origin)
	.pipe(foreach(doTranspilation))
	.pipe(gulp.dest(destiny));
});

function doTranspilation(stream) {
	return stream
	.pipe(sourcemaps.init())
	.pipe(rollup({
		// Function names leak to the global namespace. To avoid that,
		// let's just put everything within an immediate function, this way variables
		// are all beautifully namespaced.
		banner: '(function () {',
		footer: '}());',
		entry: origin,
		plugins: [
			nodeResolve({ jsnext: true, main: true }),
			commonjs(),
			babel({
				exclude: 'node_modules/**',
				babelrc: false,
				plugins: ['transform-async-to-generator', 'external-helpers-2'],
				presets: ['es2015-rollup'],
			}),
		],
	}))
	.pipe(sourcemaps.write('.'));
}
