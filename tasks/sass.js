const gulp = require('gulp');
const sass = require('gulp-sass');
const paths = require('./paths.json');

const origin = paths.style.src;
const destiny = paths.style.dist;

gulp.task('sass', () => {
	gulp.src(origin)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(destiny));
});
