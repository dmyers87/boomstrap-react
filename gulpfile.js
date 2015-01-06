'use strict';

var gulp   = require('gulp');

gulp.task('transformScripts', function() {
  var to5    = require('gulp-6to5');
  return gulp.src('src/**')
    .pipe(to5())
    .pipe(gulp.dest('dist/'));
});

gulp.task('compileScripts', function() {
  var browserify = require('browserify');
  var to5ify     = require('6to5ify');
  var source     = require('vinyl-source-stream');
  //var uglify     = require('uglifyify');

  var globalShim = require('browserify-global-shim').configure({
    'react/addons': 'React'
  });

  var b = browserify({ standalone: 'BoomstrapReact'});
  //b.exclude('react/addons');
  //b.exclude('lodash');

  b.transform(to5ify); // use the 6to5ify transform
  b.transform(globalShim);

  // TODO: Implement uglifyify
  //b.transform(uglify);
  b.add('./src/App.js');

  return b.bundle()
  .pipe(source('boomstrap-react.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('docs', function() {
  gulp.src('docs/**')
    .pipe(gulp.dest('www/docs/'));

  gulp.src(['index.html', 'react-boomstrap.svg'])
    .pipe(gulp.dest('www/'));

  return gulp.src('dist/boomstrap-react.js')
    .pipe(gulp.dest('www/'));
});

gulp.task('default', ['transformScripts', 'compileScripts']);
gulp.task('website', ['docs']);
