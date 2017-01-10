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
    'google-analytics': './src/targets/google-analytics',
    'google-tag-manager': './src/targets/google-tag-manager',
    'segment': './src/targets/segment',
  },

  output: {
    path: path.join(__dirname, 'targets/dist'),
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
