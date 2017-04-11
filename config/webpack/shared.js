require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: [
    path.join(rootPath, 'src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.(eot|ttf|woff2|woff)$/,
      use: 'url-loader?prefix=fonts/&context=/src/fonts'
    }, {
      test: /\.(scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader', {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve('node_modules/foundation-sites/scss/')]
            }
          },
          'postcss-loader'
        ]
      })
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(rootPath, 'src'),
      path.join(rootPath, 'node_modules')
    ]
  },

  resolveLoader: {
    modules: [
      path.join(rootPath, 'node_modules')
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new webpack.DefinePlugin({
      config: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        CMS_API_URL: JSON.stringify(process.env.CMS_API_URL),
        BASEMAP_TILE_URL: JSON.stringify(process.env.BASEMAP_TILE_URL)
      }
    })
  ]

};

module.exports = config;
