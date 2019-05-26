const { externals, moduleWithRules, resolve, plugins } = require('./index')
const { distPath, appEntryFilePath } = require('../paths')

module.exports = (env, argv) => {
  const isDevelopmentMode = argv.mode === 'development'
  const publicPath = '.'

  return {
    stats: isDevelopmentMode ? 'minimal' : 'normal',

    devtool: isDevelopmentMode ? 'source-map' : 'none',

    entry: {
      index: [appEntryFilePath],
    },

    output: {
      path: distPath,
      filename: '[name].js',
      libraryTarget: 'umd',
    },

    externals: externals({ isDevelopmentMode, isTestMode: false, publicPath }),

    resolve: resolve({ isDevelopmentMode, isTestMode: false, publicPath }),

    plugins: plugins({ isDevelopmentMode, isTestMode: false, publicPath }),

    module: moduleWithRules({ isDevelopmentMode, isTestMode: false, publicPath }),
  }
}
