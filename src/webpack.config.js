const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');
const vue = require('vue-loader')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, './src/index.js'), //入口文件
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        loader: 'less-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: { presets: ['es2015'] },
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client"),
          resolve('node_modules/element-ui/src'),
          resolve('node_modules/vue-easytable/libs'),
        ]
      },
    ]
  },
  loaders: {
    css: ExtractTextPlugin.extract("css"),
    less: ExtractTextPlugin.extract("css!less")
  },
  autoprefixer: {
    browsers: ["ios_saf >= 7", "android >= 4"]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin("[name].css")
  ]
}