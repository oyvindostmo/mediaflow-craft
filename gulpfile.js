var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var zip = require('gulp-zip');
var shell = require('gulp-shell');
var rimraf = require('gulp-rimraf');
var ignore = require('gulp-ignore');

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

gulp.task('composer', function() {
    return gulp.src('composer.json')
        .pipe(shell('composer update'));
});

gulp.task('clean', function() {
    return gulp.src('mediaflow.zip').pipe(rimraf());
});

gulp.task('release', ['clean', 'composer'], function() {
    return gulp.src(['**/*', '!node_modules/**'])
        .pipe(zip('mediaflow.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch(sassFiles, ['sass']);
});

gulp.task('default', ['watch']);
