const path = require('path')
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
    libraryTarget: 'umd',
  },

  plugins: [new CleanWebpackPlugin()],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_module|dist)/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
}
