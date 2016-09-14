 'use strict';

var minimize = process.argv.indexOf('--minimize') !== -1;
var webpack = require('webpack')

var env = process.env.NODE_ENV
var config = {
  module: {
    loaders: [
      //{ test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: { },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    //new webpack.DefinePlugin({
      //'process.env.NODE_ENV': JSON.stringify(env)
    //})
  ]
};

if (minimize) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
      compress: true,
      output: {
        comments: false,
      }
    })
  )
}

module.exports = config
