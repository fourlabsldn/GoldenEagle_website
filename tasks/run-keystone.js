const gulp = require('gulp');
const shell = require('gulp-shell');
const organiser = require('gulp-organiser');

module.exports = organiser.register((task) => {
  gulp.task(task.name, shell.task('node keystone.js'));
});
