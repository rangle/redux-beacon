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
    'dist/redux-beacon': './src/main/index',
    'targets/dist/segment': './src/targets/segment',
    'targets/dist/google-tag-manager': './src/targets/google-tag-manager',
    'targets/dist/google-analytics': './src/targets/google-analytics',
    'targets/dist/cordova-google-analytics': './src/targets/cordova-google-analytics',
    'extensions/dist/logger': './src/extensions/logger',
    'extensions/dist/offline-web': './src/extensions/offline-web',
  },

  output: {
    path: path.join(__dirname, './'),
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
