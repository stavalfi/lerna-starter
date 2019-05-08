const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const rootPath = path.resolve(__dirname)
const srcPath = path.resolve(rootPath, 'src')
const distPath = path.resolve(rootPath, 'dist')

module.exports = {
  entry: {
    app: [path.resolve(srcPath, 'index.js')],
  },

  output: {
    path: distPath,
    filename: 'x-core.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_module|dist)/,
        use: ['babel-loader'],
      },
    ],
  },

  plugins: [new CleanWebpackPlugin()],
}
