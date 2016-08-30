const taskName = require('path').parse(__filename).name;
module.exports = taskName;

// This task will start all tasks in this folder
const folderToLoad = `./${taskName}`;

const gulp = require('gulp');
const requireFolder = require('require-dir-all');
const tasksObject = requireFolder(folderToLoad);
const watchTasks = Object.keys(tasksObject).map(k => tasksObject[k]);

gulp.task(taskName, watchTasks);
