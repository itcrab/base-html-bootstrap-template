var gulp         = require('gulp'),
    sourcemaps   = require('gulp-sourcemaps'),
    concat       = require('gulp-concat'),
    watch        = require('gulp-watch'),
    minifyCSS    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    stylus       = require('gulp-stylus'),
    nib          = require('nib'),
    less         = require('gulp-less'),
    sass         = require('gulp-sass'),
    coffee       = require('gulp-coffee'),
    gutil        = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    jade         = require('gulp-jade'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    browserSync  = require('browser-sync');

// CSS
gulp.task('css', function () {
    gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './css/main.css',
        './css/stylus/stylus_main.css',
        './css/less/less_main.css',
        './css/scss/scss_main.css',
        './css/sass/sass_main.css'
        ])
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer 8', 'ie >= 8'],
            cascade: false,
            remove: false
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});

// JS
gulp.task('js', function () {
    gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/jquery-migrate/jquery-migrate.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './js/main.js',
        './js/coffee/coffee_main.js'
        ])
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

// JS for IE
gulp.task('js-ie', function () {
    gulp.src([
        './bower_components/html5shiv/dist/html5shiv.min.js',
        './bower_components/respond/dest/respond.min.js'
        ])
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('all.ie.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

// Stylus
gulp.task('stylus', function () {
    gulp.src('./css/stylus/**/*.styl')
        .pipe(stylus({use: nib()}))
        .pipe(gulp.dest('./css/stylus'));
});

// LESS
gulp.task('less', function () {
    gulp.src('./css/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css/less'));
});

// SASS
gulp.task('sass', function () {
    gulp.src('./css/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/scss'));
    gulp.src('./css/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/sass'));
});

// CoffeeScript
gulp.task('coffee', function () {
    gulp.src('./js/coffee/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./js/coffee'));
});

// Jade
gulp.task('jade', function () {
    gulp.src('./*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'));
});

// Images
gulp.task('images', function () {
    return gulp.src('./img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/img/'));
});

// Watcher
gulp.task('watch', function () {
    gulp.watch([
        './bower_components/**/*.css',
        './css/main.css',
        './css/stylus/stylus_main.css',
        './css/less/less_main.css',
        './css/scss/scss_main.css',
        './css/sass/sass_main.css'
        ], ['css']);
    gulp.watch([
        './bower_components/**/*.js',
        './js/main.js',
        './js/coffee/coffee_main.js'
        ], ['js', 'js-ie']);
    gulp.watch([
        './css/stylus/**/*.styl'
        ], ['stylus']);
    gulp.watch([
        './css/less/**/*.less'
        ], ['less']);
    gulp.watch([
        './css/scss/**/*.scss',
        './css/sass/**/*.sass'
        ], ['sass']);
    gulp.watch([
        './js/coffee/**/*.coffee'
        ], ['coffee']);
    gulp.watch([
        './*.jade'
        ], ['jade']);
});

// BrowserSync
gulp.task('browser-sync', function () {
    browserSync.init([
        './dist/css/all.min.css',
        './dist/js/all.ie.min.js',
        './dist/js/all.min.js',
        './dist/img/**/*',
        './*.html'
        ], {
        server: {
            baseDir: './'
        }});
});

// Compile
gulp.task('compile', ['stylus', 'less', 'sass', 'css', 'coffee', 'js', 'js-ie', 'jade']);

// Deploy
gulp.task('deploy', ['images']);

// default
gulp.task('default', ['watch', 'browser-sync']);
