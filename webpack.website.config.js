var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    'boomstrap-react-docs': path.join(__dirname, 'website/App.jsx'),
    vendor: [
      'component-playground',
      'react-bootstrap'
    ]
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /examples/],
        loader: 'babel-loader'
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader!autoprefixer-loader?{browsers:["last 2 version", "IE 9"]}'}
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.less', '.jsx'],
    alias: {
      'babel-core/browser': path.join(__dirname, 'node_modules/babel-core/browser.min.js')
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      exclude: /vendor/
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};
