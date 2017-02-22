'use strict'
var babelify = require('babelify')
var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var gulp = require('gulp')
var gutil = require('gulp-util')
var livereload = require('gulp-livereload')
var merge = require('merge')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var watchify = require('watchify')
var watch = require('gulp-watch')

var config = {
  js: {
    src: './js/index.js',
    outputDir: './build/',
    mapDir: './maps/',
    outputFile: 'bundle.js'
  }
}

function bundle (bundler) {
  bundler
    .bundle()
    .pipe(source(config.js.src))
    .pipe(buffer())
    .pipe(rename(config.js.outputFile))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(livereload())
}

gulp.task('bundle', function () {
  var bundler = browserify(config.js.src).transform(babelify, {
    presets: [ 'es2015' ]
  })

  bundle(bundler)
})

gulp.task('fonts', function () {
  gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/fonts'))
})

gulp.task('watch', function () {
  watch('js/**/*.js', function () {
    gulp.start('bundle')
  })
})
