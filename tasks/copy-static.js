const gulp = require('gulp');
const paths = require('./paths.json');
const path = require('path');

const origin = paths.static.src;
const destiny = paths.static.dist;
const excludeExtensions = ['js', 'scss', 'jpg', 'jpeg', 'png', 'gif'];

gulp.task('copy-static', () => {
	const excludePaths = `**/*.{${excludeExtensions.join(',')}}`;
	return gulp.src([origin, `!${path.join(origin, excludePaths)}`])
		.pipe(gulp.dest(destiny));
});
