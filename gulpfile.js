var gulp         = require('gulp'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename       = require('gulp-rename'),
    watch        = require('gulp-watch'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglify'),
    stylus       = require('gulp-stylus'),
    nib          = require('nib'),
    less         = require('gulp-less'),
    sass         = require('gulp-sass'),
    coffee       = require('gulp-coffee'),
    gutil        = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    pug          = require('gulp-pug'),
    nunjucks     = require('gulp-nunjucks'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    browserSync  = require('browser-sync'),
    rewriteCSS   = require('gulp-rewrite-css'),
    include      = require("gulp-include"),
    gulpsync     = require('gulp-sync')(gulp);

// CSS
gulp.task('css', function () {
    gulp.src('./css/all.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false
        }))
        .pipe(cleanCSS())
        .pipe(rewriteCSS({destination: './dist/css'}))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});

// JS
gulp.task('js', function () {
    gulp.src('./js/all.js')
        .pipe(sourcemaps.init())
        .pipe(include()).on('error', console.log)
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));

    // for IE
    gulp.src('./js/all.ie.js')
        .pipe(sourcemaps.init())
        .pipe(include()).on('error', console.log)
        .pipe(uglify())
        .pipe(rename('all.ie.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

// Stylus
gulp.task('stylus', function () {
    gulp.src('./css/stylus/stylus_main.styl')
        .pipe(stylus({use: nib()}))
        .pipe(gulp.dest('./css/stylus'));
});

// LESS
gulp.task('less', function () {
    gulp.src('./css/less/less_main.less')
        .pipe(less())
        .pipe(gulp.dest('./css/less'));
});

// SASS
gulp.task('sass', function () {
    gulp.src('./css/scss/scss_main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/scss'));
    gulp.src('./css/sass/sass_main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/sass'));
});

// CoffeeScript
gulp.task('coffee', function () {
    gulp.src('./js/coffee/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./js/coffee'));
});

// Nunjucks
gulp.task('nunjucks', function buildHTML() {
    gulp.src('./*.nunjucks')
        .pipe(nunjucks.compile())
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('./'));
});

// Pug
gulp.task('pug', function buildHTML() {
    gulp.src('./*.pug')
        .pipe(pug())
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
        './css/css/main.css',
        './css/stylus/stylus_main.css',
        './css/less/less_main.css',
        './css/scss/scss_main.css',
        './css/sass/sass_main.css'
        ], ['css']);
    gulp.watch([
        './bower_components/**/*.js',
        './js/main.js',
        './js/coffee/coffee_main.js'
        ], ['js']);
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
        './*.nunjucks',
        './views/nunjucks/**/*.nunjucks'
        ], ['nunjucks']);
    gulp.watch([
        './*.pug',
        './views/pug/**/*.pug'
        ], ['pug']);
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

// Screenshots
gulp.task('screenshot', function () {
    var Pageres = require('pageres');

    pageres = new Pageres({delay: 2})
        .src('localhost', ['1920x1080', '1366x768', '1280x1024'])
        .src('localhost:3000', ['1920x1080', '1366x768', '1280x1024'])
        .src('localhost:3001', ['1920x1080', '1366x768', '1280x1024'])
        .dest('./dist/screenshots')
        .run(function (err) {
            console.log('Creating screenshots is done!');
        });
});

// Compile
gulp.task('compile', gulpsync.sync(
    ['stylus', 'less', 'sass', 'coffee', 'nunjucks', 'pug'],
    'css', 'js'
));

// Deploy
gulp.task('deploy', ['images', 'screenshot']);

// default
gulp.task('default', ['watch', 'browser-sync']);
