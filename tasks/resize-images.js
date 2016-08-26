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
const imageWidths = [1240, 1020, 820, 620, 310];

// ================================================
// Resizes images to specified image widths
// ================================================

gulp.task('resize-images', () => {
	imageWidths.forEach(w => resizeToWidth(w, origin, destiny));
});

function resizeToWidth(widthVal, fromDir, toDir) {
	gulp.src(path.join(fromDir, '*.{jpg,png}'))

	// Only convert changed files
	.pipe(changed(toDir))

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
	.pipe(rename({
		suffix: `-${widthVal}`
	}))

	.pipe(gulp.dest(toDir));
}
