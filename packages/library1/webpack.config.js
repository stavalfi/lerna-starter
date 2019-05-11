const { getPlugins, getModule, getResolve } = require('./webpack/webpack-config-functions')
const { distPath, appEntryFilePath } = require('./paths')

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development'
  const publicPath = '.'
  return {
    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: [appEntryFilePath],
    },

    output: {
      path: distPath,
      filename: '[name].js',
      libraryTarget: 'umd',
    },

    resolve: getResolve({ isDevelopmentMode }),
    plugins: getPlugins({ isDevelopmentMode }),
    module: getModule({ isDevelopmentMode, isTestMode: false, publicPath }),
  }
}
