const { getPlugins, getModule, getResolve } = require('./webpack/webpack-config-functions')
const { distPath, appEntryFilePath } = require('./paths')

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development'
  return {
    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: [appEntryFilePath],
    },

    output: {
      path: distPath,
      filename: '[contenthash].js',
      libraryTarget: 'umd',
    },

    resolve: getResolve(),
    plugins: getPlugins(),
    module: getModule({ isDevelopmentMode, isTestMode: false }),
  }
}
