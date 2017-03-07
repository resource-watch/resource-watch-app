require('dotenv').config({ silent: true });

process.env.BROWSERSLIST_CONFIG = 'browserslist';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: [
    path.join(rootPath, 'src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/'
  },

  externals: {
    leaflet: 'L'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(scss|sass)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve('node_modules/foundation-sites/scss/')]
          }
        }, {
          loader: 'postcss-loader'
        }]
      }, {
        test: /\.(eot|ttf|woff2|woff)$/,
        use: [{
          loader: 'url-loader',
          options: {
            prefix: 'fonts/',
            context: '/src/fonts'
          }
        }]
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            prefix: 'image/',
            limit: 5000,
            context: '/src/images'
          }
        }]
      }
    ]
  },

  resolve: {
    modules: [
      path.join(rootPath, 'src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      config: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        BASEMAP_TILE_URL: JSON.stringify(process.env.BASEMAP_TILE_URL),
      }
    })
  ]

};

// Environment configuration
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
} else {
  config.devtool = 'eval-source-map';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
