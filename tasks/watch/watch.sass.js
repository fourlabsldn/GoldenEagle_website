const taskName = 'watch:sass';
module.exports = taskName;

const gulp = require('gulp');
const paths = require('../paths.json');
const origin = paths.style.src;
const sass = require('../sass');
gulp.task(taskName, () => gulp.watch(origin, [sass]));
