const webpack = require('webpack');
const merge = require('webpack-merge');

const sharedConfig = require('./shared.js');

module.exports = merge(sharedConfig, {

  output: { filename: '[name]-[hash].js' },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader']
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]

});
