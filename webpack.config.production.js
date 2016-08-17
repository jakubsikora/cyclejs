var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
       }
    })
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