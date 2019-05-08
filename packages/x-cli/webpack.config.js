const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.resolve(__dirname)
const srcPath = path.resolve(rootPath, 'src')
const distPath = path.resolve(rootPath, 'dist')

module.exports = {
  entry: {
    index: [path.resolve(srcPath, 'index.ts')],
  },

  output: {
    path: distPath,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_module|dist)/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 8082,
  },

  devtool: 'source-map',
}
