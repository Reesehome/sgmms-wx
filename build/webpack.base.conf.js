var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var glob = require('glob')
var MpvueEntry = require('mpvue-entry')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const entry = MpvueEntry.getEntry('./src/router/routes.js')

module.exports = {
  entry,
  target: require('mpvue-webpack-target'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: { 
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'mpvue',
      '@': resolve('src'),
      '@cmpt' : resolve('src/components'),
      '@pages' : resolve('src/pages'),
      '@style' : resolve('src/assets/styles'),
      // '@script': resolve('src/assets/scripts'),
      '@utils': resolve('src/utils'),
      '@api': resolve('src/api')
    },
    symlinks: false,
    aliasFields: ['mpvue', 'weapp', 'browser'],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      //{
      //  test: /\.(js|vue)$/,
      //  loader: 'eslint-loader',
      //  enforce: 'pre',
      //  include: [resolve('src'), resolve('test')],
      //  options: {
      //    formatter: require('eslint-friendly-formatter')
      //  }
      //},
      {
        test: /\.vue$/,
        loader: 'mpvue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: [
          'babel-loader',
          {
            loader: 'mpvue-loader',
            options: {
              checkMPEntry: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name]].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins: [
    new MpvuePlugin(),
    new MpvueEntry()
  ]
}
