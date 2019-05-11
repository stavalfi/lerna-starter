const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getPlugins, getModule, getResolve } = require('./webpack/webpack-config-functions')
const { distPath, appEntryFilePath } = require('./paths')

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development'
  const publicPath = '/'
  return {
    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: [appEntryFilePath],
    },

    output: {
      path: distPath,
      filename: '[contenthash].js',
      publicPath,
    },

    devServer: {
      host: 'localhost',
      port: 8082,
    },

    resolve: getResolve({ isDevelopmentMode }),
    plugins: [
      ...getPlugins({ isDevelopmentMode }),
      new HtmlWebpackPlugin({
        template: path.resolve('index.html'),
      }),
    ],
    module: getModule({ isDevelopmentMode, isTestMode: false, publicPath }),
  }
}