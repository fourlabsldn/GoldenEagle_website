const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const paths = require('./paths');
const depLinker = require('dep-linker');

const destiny = paths.es6.dist;
gulp.task(taskName, () => depLinker.linkDependenciesTo(destiny));
