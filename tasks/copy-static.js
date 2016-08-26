const gulp = require('gulp');
const paths = require('./paths.json');
const path = require('path');

// Config
const origin = paths.static.src;
const destiny = paths.static.dist;
const excludeExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const excludeFolders = ['js_es6', 'styles']; // Paths relative to origin
const folderMapping = {	'js_static': 'js' }; // eslint-disable-line quote-props

gulp.task('copy-static', () => {
	const mappedFolders = Object.keys(folderMapping);

	const include = ['**/*'];
	const fileExcludes = excludeExtensions.map(extensionMatch);
	const foldersExcludes = [
		...excludeFolders.map(folderMatch),
		...mappedFolders.map(folderMatch),
	];

	// Copy as is
	const exclude = [...fileExcludes, ...foldersExcludes];
	copyFromTo(origin, destiny, include, exclude);

	// Copy mapped
	mappedFolders.forEach(f => {
		const root = path.join(origin, f);
		const dest = path.join(destiny, folderMapping[f]);
		console.log(`Copying from ${root} to ${dest}`);
		copyFromTo(root, dest, include, fileExcludes);
	});
});

// Matches folders to be included and excluded propperly
function folderMatch(folderPath) {
	return `${folderPath}{,/**}`;
}

function extensionMatch(ext) {
	return `**/*.{${ext}}`;
}

function excludePath(p) {
	return `!${p}`;
}

function fromOrigin(root) {
	return p => path.join(root, p);
}

function copyFromTo(root, dest, copy, exclude) {
	const copyPaths = copy.map(fromOrigin(root));
	const excludePaths = exclude.map(fromOrigin(root)).map(excludePath);

	console.log('Copying:', [...copyPaths, ...excludePaths]);
	gulp.src([...copyPaths, ...excludePaths])
		.pipe(gulp.dest(dest));
}
