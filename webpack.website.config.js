var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'website/App.jsx'),
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'boomstrap-react-docs.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader!autoprefixer-loader?{browsers:["last 2 version", "IE 9"]}'}
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.less', '.jsx']
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin([])
  ],
  externals: {
    'react': 'React',
    'react/addons': 'React',
    'boomstrap-react': 'BoomstrapReact'
  }
};
