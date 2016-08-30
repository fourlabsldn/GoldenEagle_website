const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const copyStatic = require('./copy-static');
const resizeImages = require('./resize-images');
const sass = require('./sass');

gulp.task(taskName, [copyStatic, resizeImages, sass]);
