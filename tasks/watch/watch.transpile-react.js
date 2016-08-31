const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const paths = require('../paths.json');
const origin = paths.es6.watch;

const transpileReact = require('../transpile-react');
gulp.task(taskName, () => gulp.watch(origin, [transpileReact]));
