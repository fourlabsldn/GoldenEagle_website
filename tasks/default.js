const gulp = require('gulp');
const watch = require('./watch');
const runKeystone = require('./run-keystone');
const build = require('./build');
const organiser = require('gulp-organiser');

const tasks = [build, watch, runKeystone].map(t => t.name);

module.exports = organiser.register((task) => {
  gulp.task(task.name, tasks);
});
