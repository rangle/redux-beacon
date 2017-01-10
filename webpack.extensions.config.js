const webpack = require('webpack');
const path = require('path');

const isProdBuild = process.env.NODE_ENV === 'PRODUCTION';

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    ],
  },

  entry: {
    'logger': './src/extensions/logger',
    'offline-web': './src/extensions/offline-web',
  },

  output: {
    path: path.join(__dirname, 'extensions/dist'),
    filename: isProdBuild ? '[name].umd.min.js' : '[name].umd.js',
    libraryTarget: 'umd',
  },

  plugins: isProdBuild ? [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    }),
  ] : [],
};
