const gulp = require('gulp');
const shell = require('gulp-shell');

const straw = require('./straw');
module.exports = straw((task) => {
  gulp.task(task.name, shell.task('node keystone.js'));
});
