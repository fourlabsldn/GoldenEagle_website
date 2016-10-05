const gulp = require('gulp');
const organiser = require('gulp-organiser');

const tasks = [
  require('./watch'),
  require('./run-keystone'),
  require('./build'),
].map(t => t.name);

module.exports = organiser.register((task) => {
  gulp.task(task.name, tasks);
});
