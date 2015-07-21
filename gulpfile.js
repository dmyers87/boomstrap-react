'use strict';

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var ghpages = require('gulp-gh-pages');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('compileScripts', function(callback) {
  // run webpack
  webpack(require('./webpack.config.js'), function(err, stats) {
    if (err) {
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

  // copy Boomstrap's svg files for use in documentation
  gulp.src('bower_components/boomstrap/dist/svg/**/*.svg')
    .pipe(gulp.dest('www/svg/'));

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

gulp.task('default', ['compileScripts']);

gulp.task('server', ['copyDocs'], function() {
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
