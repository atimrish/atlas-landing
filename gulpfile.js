'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cleanHtml = require('gulp-cleanhtml')
const webserver = require('gulp-webserver')

function buildCss() {
    return gulp.src('./src/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
}

function clearHtml() {
    return gulp.src('./src/pages/**/*.html')
        .pipe(cleanHtml())
        .pipe(gulp.dest('./dist/pages/'))
}

function watch() {
    gulp.watch('./src/styles/**/*.scss', buildCss)
    gulp.watch('./src/pages/**/*.html', clearHtml)
}

function webServer() {
    gulp.src('.').pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: false,
    }))
}

function defaultTask(cb) {
    buildCss()
    clearHtml()
    cb()
}

exports.default = defaultTask
exports.watch = watch
exports.webserver = webServer
