const gulp = require('gulp');
const sass = require('gulp-sass');
const paths = require('./paths.json');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const straw = require('./straw');

module.exports = straw(paths, (task) => {
  gulp.task(task.name, () => {
    gulp.src(task.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ['last 15 versions'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(task.dest));
  });
});
