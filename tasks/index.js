const paths = require('./paths.json');
const resizeImages = require('./resizeImages.js');
const gulp = require('gulp');
const watch = require('gulp-watch');
const shell = require('gulp-shell')
const sass = require('gulp-sass');

gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function () {
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', ['watch:sass']);
gulp.task('default', ['watch', 'runKeystone']);
gulp.task('resizeImages', resizeImages);

gulp.task('build', ['resizeImages']);
