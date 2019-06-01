const { externals, moduleWithRules, resolve, plugins } = require('./index')
const { distPath, appEntryFilePath } = require('../paths')

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development' || (env || {}).devServer
  const publicPath = '.'

  return {
    stats: isDevelopmentMode ? 'minimal' : 'normal',

    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: [appEntryFilePath],
    },

    devServer: {
      host: 'localhost',
      port: 8082,
    },

    output: {
      path: distPath,
      filename: '[hash].js',
    },

    externals: externals({ isDevelopmentMode, isTestMode: false, publicPath }),

    resolve: resolve({ isDevelopmentMode, isTestMode: false, publicPath }),

    plugins: plugins({ isDevelopmentMode, isTestMode: false, publicPath }),

    module: moduleWithRules({ isDevelopmentMode, isTestMode: false, publicPath }),
  }
}
