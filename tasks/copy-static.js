const taskName = 'copy-static';
module.exports = taskName;

const gulp = require('gulp');
const paths = require('./paths.json');
const path = require('path');

// Config
const origin = paths.static.src;
const destiny = paths.static.dist;

// All paths with an src
const excludePaths = Object.keys(paths)
	.map(k => paths[k])
	.map(v => v.src)
	.filter(p => p && p !== origin);

// Paths relative to origin
const folderMapping = {
	'js_static/**/*': 'js', // eslint-disable-line quote-props
};

gulp.task(taskName, () => {
	const mapped = Object.keys(folderMapping);
	const include = ['**/*'];
	const exclude = [...excludePaths, ...mapped];
	copyFromTo(origin, destiny, include, exclude);

	// Copy mapped
	mapped.forEach(m => {
		const root = path.join(origin, m);
		const dest = path.join(destiny, folderMapping[m]);
		copyFromTo(root, dest, include, excludePaths);
	});
});

function excludePath(p) {
	return `!${p}`;
}

function fromOrigin(root) {
	return p => path.join(root, p);
}

function copyFromTo(root, dest, copy, exclude) {
	const toCopy = copy.map(fromOrigin(root));
	const toExclude = exclude.map(fromOrigin(root)).map(excludePath);
	console.log('Copying:', toCopy, 'Excluding:', 'toExclude');
	gulp.src([...toCopy, ...toExclude])
		.pipe(gulp.dest(dest));
}
