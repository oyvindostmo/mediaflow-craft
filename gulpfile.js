var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

var sassFiles = 'resources/*.scss';

gulp.task('sass', function() {
    gulp.src(sassFiles)
        .pipe(sass())
        .pipe(gulp.dest('resources/'));
});

gulp.task('jshint', function() {
    gulp.src('resources/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    gulp.watch(sassFiles, ['sass']);
});

gulp.task('default', ['watch']);
