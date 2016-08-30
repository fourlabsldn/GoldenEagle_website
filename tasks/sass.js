const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const sass = require('gulp-sass');
const paths = require('./paths.json');

const origin = paths.style.src;
const destiny = paths.style.dist;

gulp.task(taskName, () => {
	gulp.src(origin)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(destiny));
});
