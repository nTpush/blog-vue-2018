const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config').dll
const webpackConfig = {
  entry: config.entry,
  output: {
    path: config.outputPath,
    filename: '[name].dll.[chunkhash].js',
    library: '[name]_library',
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      path: path.join(config.outputPath, '[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ManifestPlugin({
      fileName: path.join(config.outputPath, 'manifest.dll.json')
    })
  ]
}
module.exports = webpackConfig
