const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const shell = require('gulp-shell');
gulp.task(taskName, shell.task('node keystone.js'));
