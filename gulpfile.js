'use strict';

var gulp    = require('gulp');
var ghpages = require('gulp-gh-pages');
var connect = require('gulp-connect');

function compileScriptsFromEntryPoint(entry, fileName, destination) {
  var browserify = require('browserify');
  var to5ify     = require('babelify');
  var source     = require('vinyl-source-stream');
  //var uglify     = require('uglifyify');

  var globalShim = require('browserify-global-shim').configure({
    'react/addons': 'React'
  });

  var b = browserify({ standalone: 'BoomstrapReact'});
  //b.exclude('react/addons');
  //b.exclude('lodash');

  b.transform(to5ify); // use the babelify transform
  b.transform(globalShim);

  // TODO: Implement uglifyify
  //b.transform(uglify);
  b.add(entry);

  return b.bundle()
  .pipe(source(fileName))
  .pipe(gulp.dest(destination));
}

gulp.task('transformScripts', function() {
  var to5    = require('gulp-babel');
  return gulp.src('src/**')
    .pipe(to5())
    .pipe(gulp.dest('dist/'));
});

gulp.task('compileScripts', ['transformScripts'], function() {
  return compileScriptsFromEntryPoint('./dist/App.js', 'boomstrap-react.js', 'dist/');
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
gulp.task('websiteDeploy', ['docs'], function() {
  return gulp.src('./www/**/*')
    .pipe(ghpages());
});

gulp.task('default', ['transformScripts', 'compileScripts']);

gulp.task('server', ['docs'], function() {
  connect.server({
    hostname: 'localhost',
    port: 9000,
    root: 'www',
    keepalive: false,
    livereload: true
  });

  // Watch Javascript Files
  gulp.watch([
    'website/**/*.jsx'
  ], ['docs']);

});

gulp.task('website', ['websiteDeploy']);
