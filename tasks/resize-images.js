const taskName = 'resize-images';
module.exports = taskName;

const os = require('os');
const path = require('path');
const gulp = require('gulp');
const paths = require('./paths.json');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const parallel = require('concurrent-transform');
const imageResize = require('gulp-image-resize');

const origin = paths.images.src;
const destiny = paths.images.dist;
const imageWidths = [1500, 1240, 1020, 820, 620, 310];
const extensions = ['jpg', 'png'];

// NOTE: Not working and not showing any errors?
// 			Check this line: .pipe(changed(toDir))
// 			Only converts if there are changes


// ================================================
// Resizes images to specified image widths
// ================================================

gulp.task(taskName, () => {
	imageWidths.forEach(w => resizeToWidth(w, origin, destiny));
});

function resizeToWidth(widthVal, fromDir, toDir) {
	const globbingPaths = extensions.map(e => path.join(fromDir, `*.${e}`));

	// We don't rename the maximum size to serve as a fallback in case
	// there is no support for responsive-image in the browser
	const maxSize = imageWidths[0];
	const suffix = widthVal === maxSize ? '' : `-${widthVal}`;

	gulp.src(globbingPaths)

	// Only convert changed files
	// .pipe(changed(toDir))

	// Execute computations in parallel
	.pipe(parallel(
		// Resize images
		imageResize({
			width: widthVal,
			upscale: false,
		}),
		// Divide resize in this many cpus
		os.cpus().length
	))

	// Rename
	.pipe(rename({ suffix }))

	.pipe(gulp.dest(toDir));
}
