module.exports = {
	'src': [
		'./models/**/*.js',
    './routes/**/*.js',
    'keystone.js',
    'package.json'
	],
	'sass': {
		'src': './public_src/styles/**/*.scss',
		'dest': './public/styles/'
	},
  'copy-static': {
    'src': './public_src/**/*',
    'dest': './public',
		'map': {
			'./public_src/js_static/**/*': 'public/js'
		}
  },
	'transpile-react': {
    'watch': './public_src/js_es6/**/*.js',
		'src': './public_src/js_es6/*.js',
		'dest': './public/js'
	},
  'link-dependencies': {
    'dest': './public/js'
  }
};

// Import all tasks
const tasksDir = './tasks';
const requireFolder = require('require-dir-all');
requireFolder(tasksDir, { recursive: true });

// List all available tasks
const gulp = require('gulp');
const shell = require('gulp-shell');
gulp.task('list-tasks', shell.task('gulp --tasks'));
