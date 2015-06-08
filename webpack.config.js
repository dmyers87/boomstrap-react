var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    'boomstrap-react': path.join(__dirname, 'src/App.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'BoomstrapReact'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js',  '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    })
  ],
  externals: {
    'react': 'React',
    'react/addons': 'React',
    'react-bootstrap': 'ReactBootstrap',
    'lodash': '_'
  }
};
