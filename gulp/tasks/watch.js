var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

// To run application locally.
gulp.task('watch', function() {
  // Keeps browser in sync with source code changes.
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  // reloads page when there is a change in index.html
  watch('./app/index.html', function() {
    browserSync.reload();
  });

  // runs css task and refreshes when there is a change in any of the css files in app.
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  // runs js task and refreshes when there is a change in any of the js files in app.
  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });

});

// creates a style sheet that can be used on index page.
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

// refreshes browser when there is a change is js files.
gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});