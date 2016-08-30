const taskName = 'copy-static';
module.exports = taskName;

const gulp = require('gulp');
const paths = require('./paths.json');

// Config
const origin = paths.static.src;
const destiny = paths.static.dist;
const folderMapping = paths.static.map;

// All paths with an src
const excludePaths = Object.keys(paths)
	.map(k => paths[k])
	.map(v => v.src)
	.filter(p => p && p !== origin);

gulp.task(taskName, () => {
	const mapped = Object.keys(folderMapping);
	const exclude = [...excludePaths, ...mapped];
	copy(origin, destiny, exclude);

	// Copy mapped folders
	mapped.forEach(p => copy(p, folderMapping[p], excludePaths));
});


function copy(orig, dest, exclude) {
	const toExclude = exclude.map(p => `!${p}`);

	gulp.src([orig, ...toExclude])
		.pipe(gulp.dest(dest));
}
