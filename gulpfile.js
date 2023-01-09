const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');

gulp.task('clean', () => {
	return del([
		'languages',
		'bundled'
	]);
});

exports.bundle = () => (
	gulp.src([
		"**/*",
		"!assets/**",
		"!bundled/**",
		"!node_modules/**",
		"!src/**",
		"!.eslintrc.js",
		"!.gitignore",
		"!gulpfile.js",
		"!package.json",
		"!package-lock.json",
		"!readme.md",
		"!todo.txt",
		"!webpack.config.js",
	])
		.pipe(zip('audio-player-block.zip'))
		.pipe(gulp.dest('bundled'))
);