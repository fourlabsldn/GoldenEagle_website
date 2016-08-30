const taskName = require('path').parse(__filename).name;
module.exports = taskName;

const gulp = require('gulp');
const paths = require('./paths.json');
const responsive = require('gulp-responsive');

const origin = paths.resizeImages.src;
const destiny = paths.resizeImages.dist;
const imageWidths = [1500, 1240, 1020, 820, 620, 310];

// ================================================
// Resizes images to specified image widths
// ================================================

gulp.task(taskName, () => {
	imageWidths.forEach(w => resizeToWidth(w, origin, destiny));
});

function resizeToWidth(widthVal, fromDir, toDir) {
	// We don't rename the maximum size to serve as a fallback in case
	// there is no support for responsive-image in the browser
	const maxSize = imageWidths[0];
	const suffix = widthVal === maxSize ? '' : `-${widthVal}`;

	gulp.src(fromDir)
	.pipe(responsive({ '*': [{}] }, {
			// Global configuration for all images
			// The output quality for JPEG, WebP and TIFF output formats
			quality: 80,
			// Number or String — width in pixels or percentage of the original, not set by default.
			width: widthVal,
			// String, Object or Function — renaming options, file will not be
			// renamed by default. When extname is specified, output format is
			// parsed from extension. You can override this autodetection with format option.
			rename: { suffix },
			// Boolean — When used without parameters, performs a fast, mild sharpen
			// of the output image. This typically reduces performance by 10%. Default is false.
			sharpen: true,
			// Boolean — When used without parameters, performs a fast, mild blur of
			// the output image. This typically reduces performance by 10%. Default is false.
			blue: true,

			// Use progressive (interlace) scan for JPEG and PNG output
			progressive: true,
			// Strip all metadata
			withMetadata: false,
			skipOnEnlargement: false,
			// Do not emit the error when image is enlarged.
			errorOnEnlargement: false,
			// Silence messages and stats if 0 images were created. If you wish to
			// supress all messages and stats, set the options.stats to false as well.
			silent: true,
		}
	))

	.pipe(gulp.dest(toDir));
}
