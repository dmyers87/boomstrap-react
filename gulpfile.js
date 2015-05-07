'use strict';

var path    = require('path');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var ghpages = require('gulp-gh-pages');
var connect = require('gulp-connect');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

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

gulp.task('compileDocsScripts', function(callback) {
   // run webpack
  webpack(require('./webpack.website.config.js'), function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }
    stats = stats.toString();

    // Remove dropping unused statements and individual modules built
    var tester = /Dropping unused(.*?)\n|\n(.*?)\[built\]/g;
    stats = stats.replace(tester, '');
    gutil.log('[webpack]', stats);
    gutil.log('[webpack]', new Date());
    callback();
  });
});

gulp.task('copyDocs', function() {
  gulp.src([
    'node_modules/babel-core/browser.min.js',
    'node_modules/babel-core/browser-polyfill.min.js'
  ]).pipe(gulp.dest('www/'));

  gulp.src('docs/**')
    .pipe(gulp.dest('www/docs/'));

  gulp.src(['index.html', 'react-boomstrap.svg'])
    .pipe(gulp.dest('www/'));

  return gulp.src('dist/boomstrap-react.js')
    .pipe(gulp.dest('www/'));
});

gulp.task('docs', ['compileDocsScripts', 'copyDocs']);

// Website
gulp.task('websiteDeploy', ['docs'], function() {
  return gulp.src('./www/**/*')
    .pipe(ghpages());
});

gulp.task('default', ['transformScripts', 'compileScripts']);

gulp.task('server', ['copyDocs'], function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(require('./webpack.website.config.js'));

  new WebpackDevServer(compiler, {
    watchDelay: 300,
    contentBase: 'www/'
  }).listen(9000, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://localhost:9000/webpack-dev-server/index.html');

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('website', ['websiteDeploy']);
