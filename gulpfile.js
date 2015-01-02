'use strict';

var gulp = require('gulp');

gulp.task('default', function() {
  var browserify = require('browserify');
  var reactify   = require('reactify');
  var source     = require('vinyl-source-stream');
  var reactifyES6 = function(file) {
    return reactify(file, {'es6': true});
  };

  var b = browserify({ standalone: 'BoomStrapReact'});
  b.exclude('react/addons');
  b.exclude('lodash');
  
  b.transform(reactifyES6); // use the reactify transform
  b.add('./src/App.js');

  return b.bundle()
  .pipe(source('boomstrap-react.js'))
  .pipe(gulp.dest('dist/'));
});
