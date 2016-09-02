const gulp = require('gulp');
const copyStatic = require('./copy-static');
const sass = require('./sass');
const straw = require('./straw');

const tasks = [copyStatic, sass].map(t => t.name);

module.exports = straw({}, (task) => {
  gulp.task(task.name, tasks);
});
