const webpack = require('webpack');
const path = require('path');

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
    filename: 'redux-beacon.min.js',
    library: 'ReduxBeacon',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
};
