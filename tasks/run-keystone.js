const gulp = require('gulp');
const shell = require('gulp-shell');
gulp.task('run-keystone', shell.task('node keystone.js'));
