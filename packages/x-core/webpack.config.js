const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.resolve(__dirname)
const srcPath = path.resolve(rootPath, 'src')
const distPath = path.resolve(rootPath, 'dist')

module.exports = {
  entry: {
    index: [path.resolve(srcPath, 'index.js')],
  },

  output: {
    path: distPath,
    filename: '[name].js',
    libraryTarget: 'umd',
  },

  plugins: [new CleanWebpackPlugin()],

  devtool: 'source-map',
}
