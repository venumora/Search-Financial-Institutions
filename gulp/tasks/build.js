var gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

// to preview build changes
gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

// deletes build folder
gulp.task('deleteDistFolder', function () {
    return del("./docs");
});

// copies files other than js css files to build folder
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

// minify css and js files.
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function () {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function () { return rev() }, function () { return cssnano() }],
            js: [function () { return rev() }, function () { return uglify() }]
        }))
        .pipe(gulp.dest("./docs"));
});

// build task which will run all the above tasks.
gulp.task('build', ['deleteDistFolder', 'usemin', 'copyGeneralFiles']);