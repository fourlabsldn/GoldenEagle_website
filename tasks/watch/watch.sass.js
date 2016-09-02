const gulp = require('gulp');
const paths = require('../paths.json');
const sass = require('../sass');
const straw = require('../straw');

module.exports = straw(paths, (task) => {
  gulp.task(task.name, () => gulp.watch(task.src, [sass.name]));
});
