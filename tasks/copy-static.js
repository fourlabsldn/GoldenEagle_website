const gulp = require('gulp');
const straw = require('./straw');
const paths = require('../gulpfile');

module.exports = straw.register((task) => {
  // All paths with an src
  const excludePaths = Object.keys(paths)
    .map(k => paths[k])
    .map(v => v.src)
    .filter(p => !task.src.includes(p));

  const folderMapping = task.map;
  gulp.task(task.name, () => {
    const mapped = Object.keys(folderMapping);
    const exclude = [...excludePaths, ...mapped];
    copy(task.src, task.dest, exclude);

    // Copy mapped folders
    mapped.forEach(p => copy(p, folderMapping[p], excludePaths));
  });
});


function copy(orig, dest, exclude) {
  const toExclude = exclude.map(p => `!${p}`);

  gulp.src([orig, ...toExclude])
		.pipe(gulp.dest(dest));
}
