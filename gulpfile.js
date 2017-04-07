'use strict';

var gulp = require('gulp'), //"gulp": "^3.9.1",
    del = require('del'), //"del": "^2.2.2",
    merge = require('merge-stream'), //"merge-stream": "^1.0.1",
    tsc = require('gulp-typescript'), //"gulp-typescript": "^3.1.6",
    tsProject = tsc.createProject('tsconfig.json'),
    SystemBuilder = require('systemjs-builder'), //"systemjs-builder": "^0.16.4",
    jsMinify = require('gulp-uglify'), //"gulp-uglify": "^2.1.2",
    concat = require('gulp-concat'), //"gulp-concat": "^2.6.1",
    cssPrefixer = require('gulp-autoprefixer'), //"gulp-autoprefixer": "^3.1.1",
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    cssMinify = require('gulp-cssnano'); //"gulp-cssnano": "^2.1.2",

gulp.task('clean', function () {
    return del('build');
});

gulp.task('shims', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js'])
        .pipe(concat('shims.js'))
        .pipe(gulp.dest('build/dist/js/'));
});

gulp.task('tsc', function () {
    return gulp.src('app/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('temp'));
});

gulp.task('sBuild', ['tsc'], function () {
    var builder = new SystemBuilder();
    return builder.loadConfig('system.config.js')
        .then(function () {
            builder.buildStatic('app', 'build/dist/js/bundle.js', {
                production: false,
                rollup: false
            })
                .then(function () {
                    gulp.src('build/dist/js/bundle.js')
                        .pipe(jsMinify())
                        .pipe(rename('bundle.min.js'))
                        .pipe(gulp.dest('build/dist/js/'));
                    del('build/dist/js/bundle.js');
                    del('temp')
                })
        })
});


gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('build/dist/app'));
});

gulp.task('assets', function () {
    gulp.src('build-files/build-index.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build/dist'));
    gulp.src(['build-files/*', '!build-files/build-index.html'])
        .pipe(gulp.dest('build'));
    gulp.src('node_modules/bootstrap/fonts/*')
        .pipe(gulp.dest('build/dist/fonts'));
});

gulp.task('styles', function () {
    gulp.src(['app/**/*.css', 'node_modules/bootstrap/dist/css/bootstrap.css'])
        .pipe(concat('styles.css'))
        .pipe(cssPrefixer())
        .pipe(cssMinify())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('build/dist/css/'));
    del('build/dist/css/styles.css');
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.css', ['scss'], browserSync.reload);
    gulp.watch('app/**/*.html', ['html'], browserSync.reload);
    gulp.watch('app/**/*.ts', ['system-build'], browserSync.reload);
});

gulp.task('build', [
    'shims',
    'sBuild',
    'html',
    'assets',
    'styles'
]);

gulp.task('default', ['build']);
