const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const sass = require('gulp-sass');
const paths = require('./paths.json');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const origin = paths.style.src;
const destiny = paths.style.dist;

gulp.task(taskName, () => {
	gulp.src(origin)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer({ browsers: ['last 15 versions'] })]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destiny));
});
