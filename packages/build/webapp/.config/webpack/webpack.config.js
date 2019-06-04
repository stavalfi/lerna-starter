const { externals, moduleWithRules, resolve, plugins } = require('./index')
const generatePaths = require('../generate-paths')

const paths = generatePaths({ packageJsonFolderPath: process.env.INIT_CWD })

const { distPath, appEntryFilePath } = paths

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development' || (env || {}).devServer
  const publicPath = '/'

  return {
    stats: isDevelopmentMode ? 'minimal' : 'normal',

    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: [appEntryFilePath],
    },

    output: {
      path: distPath,
      filename: '[hash].js',
    },

    externals: externals({ isDevelopmentMode, isTestMode: false, publicPath, paths }),

    resolve: resolve({ isDevelopmentMode, isTestMode: false, publicPath, paths }),

    plugins: plugins({ isDevelopmentMode, isTestMode: false, publicPath, paths }),

    module: moduleWithRules({ isDevelopmentMode, isTestMode: false, publicPath, paths }),

    devServer: {
      host: 'localhost',
      port: 8082,
    },
  }
}
