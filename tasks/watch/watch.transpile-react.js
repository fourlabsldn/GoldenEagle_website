const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const transpileReact = require('../transpile-react');
const straw = require('../straw');

module.exports = straw.register((task) => {
  gulp.task(task.name, () => gulp.watch(task.src, [transpileReact.name]));
});
