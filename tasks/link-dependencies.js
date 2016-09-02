const gulp = require('gulp');
const paths = require('./paths');
const depLinker = require('dep-linker');

const straw = require('./straw');

module.exports = straw(paths, (task) => {
  gulp.task(task.name, () => depLinker.linkDependenciesTo(task.dest));
});
