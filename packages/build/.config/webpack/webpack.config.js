const { externals, moduleWithRules, resolve, plugins } = require('./index')
const { paths, constants } = require('../utils')

const { distPath, appEntryFilePaths } = paths
const { isWebApp, isCI } = constants

module.exports = (env = {}, argv = {}) => {
  const isDevelopmentMode = argv.mode === 'development' || env.devServer
  const publicPath = '/'
  console.log('webpack mode: ', isDevelopmentMode ? 'development' : 'production')
  console.log('test mode: No')
  console.log(`CI: ${isCI}`)

  return {
    cache: true,

    stats: isDevelopmentMode ? 'minimal' : 'normal',

    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: appEntryFilePaths,
    },

    output: {
      path: distPath,
      filename: `[${isWebApp ? 'hash' : 'name'}].js`,
      ...(!isWebApp && { libraryTarget: 'umd' }),
    },

    devServer: {
      host: 'localhost',
      port: 8082,
    },

    externals: externals({ isDevelopmentMode, isTestMode: false, constants, publicPath, paths }),

    resolve: resolve({ isDevelopmentMode, isTestMode: false, constants, publicPath, paths }),

    plugins: plugins({ isDevelopmentMode, isTestMode: false, constants, publicPath, paths }),

    module: moduleWithRules({ isDevelopmentMode, isTestMode: false, constants, publicPath, paths }),
  }
}
