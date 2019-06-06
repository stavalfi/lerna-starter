const stringToBoolean = require('boolean')

const { externals, moduleWithRules, resolve, plugins } = require('./index')
const generatePaths = require('../generate-paths')

const paths = generatePaths()

const { distPath, appEntryFilePaths } = paths
const isWebApp = stringToBoolean(process.env.WEBAPP || process.env['WEBAPP'])

module.exports = (env, argv = {}) => {
  const isDevelopmentMode = argv.mode === 'development'
  const publicPath = '.'

  return {
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

    externals: externals({ isDevelopmentMode, isTestMode: false, isWebApp, publicPath, paths }),

    resolve: resolve({ isDevelopmentMode, isTestMode: false, isWebApp, publicPath, paths }),

    plugins: plugins({ isDevelopmentMode, isTestMode: false, isWebApp, publicPath, paths }),

    module: moduleWithRules({ isDevelopmentMode, isTestMode: false, isWebApp, publicPath, paths }),
  }
}
