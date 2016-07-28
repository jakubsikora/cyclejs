var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel'],
      includes: ['./index.js', path.join(__dirname, 'src')]
    }, {
      test: /\.scss$/,
      loaders: [
        'style', 'css', 'autoprefixer-loader?browsers=last 2 versions', 'sass'
      ]
    }, {
      test: /\.(png|jpg|ttf|woff|svg|otf|eot|svg).*?$/,
      loader: 'file-loader'
    }]
  }
};