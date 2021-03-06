// List all available tasks
const organiser = require('gulp-organiser');
organiser.registerAll('./tasks', {
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
		'dest': './public/js',
    'extenalDependencies': ['react', 'react-dom', 'react-dom/server', 'lodash/fp', 'handlebars'],
	},
	'link-dependencies': {
		'dest': './public/js'
	}
});
