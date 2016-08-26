const gulp = require('gulp');
const paths = require('../paths.json');
const origin = paths.style.src;

gulp.task('watch:sass', () => gulp.watch(origin, ['sass']));
