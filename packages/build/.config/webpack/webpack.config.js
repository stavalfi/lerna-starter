const { externals, moduleWithRules, resolve, plugins, devServer } = require('./index')
const { paths, constants } = require('../utils')

const { distPath, appEntryFilePaths, allTestFilesPathsArray } = paths
const { isWebApp } = constants

module.exports = (env = {}, argv = {}) => {
  const isDevelopmentMode = argv.mode === 'development' || env.devServer
  const isTestMode = env.testMode
  const publicPath = '/'

  return {
    cache: isDevelopmentMode,

    stats: isDevelopmentMode ? 'none' : 'normal',

    devtool: isDevelopmentMode ? 'cheap-module-source-map' : 'none',

    entry: {
      index: appEntryFilePaths,
      ...(isTestMode && allTestFilesPathsArray.reduce((acc, path) => ({ ...acc, [path]: path }), {})),
    },

    output: {
      path: distPath,
      filename: `[${isWebApp ? 'hash' : 'name'}].js`,
      ...(!isWebApp && { libraryTarget: 'umd' }),
    },

    devServer: devServer({ isDevelopmentMode, isTestMode, constants, publicPath, paths }),

    externals: externals({ isDevelopmentMode, isTestMode, constants, publicPath, paths }),

    resolve: resolve({ isDevelopmentMode, isTestMode, constants, publicPath, paths }),

    plugins: plugins({ isDevelopmentMode, isTestMode, constants, publicPath, paths }),

    module: moduleWithRules({ isDevelopmentMode, isTestMode, constants, publicPath, paths }),
  }
}
