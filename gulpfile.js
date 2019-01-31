const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
		'build/scss/*.scss', 'src/scss/**'])
		.pipe(sass())
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js', 'src/js/**'])
		.pipe(gulp.dest("build/js"))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {
	browserSync.init({
		server: "./",
		open: false
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss',
		'src/scss/*.scss'], gulp.series('sass'));
	gulp.watch(['node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js', 'src/js/**'], gulp.series('js'));
	gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('js', 'serve'));
