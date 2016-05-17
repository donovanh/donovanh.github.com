// Generated on 2015-01-15 using generator-jekyllized 0.7.0
'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();

// Compiles the SASS files and moves them into the 'assets/stylesheets' directory
gulp.task('styles', function () {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src('scss/**/*.scss')
    .pipe($.sass({outputStyle: 'expanded'}))
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer('last 2 versions', { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest('stylesheets/'))
    // Outputs the size of the CSS file
    .pipe($.size({title: 'styles'}))
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task('watch', function () {
  gulp.watch(['scss/**/*.scss'], ['styles']);
});

// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', ['styles', 'watch']);
