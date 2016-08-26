const taskName = 'build';
module.exports = taskName;

const gulp = require('gulp');
const copyStatic = require('./copy-static');
const resizeImages = require('./resize-images');

gulp.task(taskName, [copyStatic, resizeImages]);
