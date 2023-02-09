const gulp = require('gulp');
const browserSync = require('browser-sync');
const zip = require('gulp-zip');
const del = require('del');

gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: 'localhost/development'
	});
	gulp.watch(['src/*.js', 'src/*.scss']).on('change', () => browserSync.reload());
});

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