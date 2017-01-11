const webpack = require('webpack');
const path = require('path');

const isProdBuild = process.env.NODE_ENV === 'PRODUCTION';

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    ],
  },

  entry: [
    './src/main/index',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProdBuild ? 'redux-beacon.umd.min.js' : 'redux-beacon.umd.js',
    library: 'ReduxBeacon',
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
  ]: [],
};
