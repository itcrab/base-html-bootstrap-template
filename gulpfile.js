var gulp       = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat     = require('gulp-concat'),
    watch      = require('gulp-watch'),
    minifyCSS  = require('gulp-minify-css'),
    uglify     = require('gulp-uglify');

// CSS
gulp.task('css', function () {
    return gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './css/main.css'
        ])
        .pipe(minifyCSS())
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/min'));
});

// JS
gulp.task('js', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/jquery-migrate/jquery-migrate.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './js/main.js'
        ])
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./js/min'));
});

// JS for IE
gulp.task('js-ie', function () {
    return gulp.src([
        './bower_components/html5shiv/dist/html5shiv.min.js',
        './bower_components/respond/dest/respond.min.js'
        ])
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('all.ie.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./js/min'));
});

// Watcher
gulp.task('watch', function () {
    gulp.watch([
        './bower_components/**/*.css',
        './css/main.css'
        ], ['css']);
    gulp.watch([
        './bower_components/**/*.js',
        './js/main.js'
        ], ['js', 'js-ie']);
});

// Compile
gulp.task('compile', ['css', 'js', 'js-ie']);

// default
gulp.task('default', ['watch']);
