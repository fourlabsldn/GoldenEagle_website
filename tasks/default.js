const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const watch = require('./watch');
const runKeystone = require('./run-keystone');
const build = require('./build');

gulp.task(taskName, [build, watch, runKeystone]);
