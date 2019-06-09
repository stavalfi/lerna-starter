const { moduleWithRules, resolve, plugins } = require('./webpack')
const { paths, constants } = require('./utils')

const { testFilesGlobsPaths, testPolyfillFilePath } = paths

module.exports = config => {
  const files = [testPolyfillFilePath, ...testFilesGlobsPaths]
  const preprocessors = testFilesGlobsPaths.reduce((acc, path) => ({ ...acc, [path]: ['webpack', 'sourcemap'] }), {})
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai', 'chai'],
    reporters: ['spec'],
    files,
    preprocessors,
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: moduleWithRules({ isDevelopmentMode: true, isTestMode: true, paths, constants }),
      resolve: resolve({ isDevelopmentMode: true, isTestMode: true, paths, constants }),
      plugins: plugins({ isDevelopmentMode: true, isTestMode: true, paths, constants }),
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
  })
}
