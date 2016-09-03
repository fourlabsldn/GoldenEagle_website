// This task will start all tasks in this folder
const gulp = require('gulp');
const straw = require('./straw');
const loadTasksFrom = addr => {
  const modules = require('require-dir-all')(addr);
  const taskConfigs = Object.keys(modules).map(k => modules[k]);
  const taskNames = taskConfigs.map(c => c.name);
  return taskNames;
};

module.exports = straw((task) => {
  const watchTasks = loadTasksFrom(`./${task.name}`);
  gulp.task(task.name, watchTasks);
});
