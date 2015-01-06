'use strict';

var gulp    = require('gulp');
var ghpages = require('gulp-gh-pages');

function compileScriptsFromEntryPoint(entry, fileName, destination) {
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
  b.add(entry);

  return b.bundle()
  .pipe(source(fileName))
  .pipe(gulp.dest(destination));
}

gulp.task('transformScripts', function() {
  var to5    = require('gulp-6to5');
  return gulp.src('src/**')
    .pipe(to5())
    .pipe(gulp.dest('dist/'));
});

gulp.task('compileScripts', function() {
  return compileScriptsFromEntryPoint('./src/App.js', 'boomstrap-react.js', 'dist/');
});

gulp.task('compileDocsScripts', function() {
  return compileScriptsFromEntryPoint('./website/App.jsx', 'boomstrap-react-docs.js', 'www/');
});

gulp.task('docs', ['compileDocsScripts'], function() {
  gulp.src('docs/**')
    .pipe(gulp.dest('www/docs/'));

  gulp.src(['index.html', 'react-boomstrap.svg'])
    .pipe(gulp.dest('www/'));

  return gulp.src('dist/boomstrap-react.js')
    .pipe(gulp.dest('www/'));
});

// Website
gulp.task('websiteDeploy', ['docs'], function () {
  return gulp.src('./www/**/*')
    .pipe(ghpages());
});

gulp.task('default', ['transformScripts', 'compileScripts']);
gulp.task('website', ['websiteDeploy']);
