const { moduleWithRules, resolve, plugins } = require('./webpack')
const { paths, constants } = require('./utils')

const { testsPath } = paths
const { isCI } = constants

module.exports = config => {
  console.log('webpack mode: development')
  console.log('test mode: Yes')
  console.log(`CI: ${isCI}`)

  const files = [
    `${testsPath}/utils/import-polyfills.ts`,
    `${testsPath}/*.spec.js`,
    `${testsPath}/**/*.spec.js`,
    `${testsPath}/*.spec.ts`,
    `${testsPath}/**/*.spec.ts`,
    `${testsPath}/*.spec.tsx`,
    `${testsPath}/**/*.spec.tsx`,
  ]
  const preprocessors = files.slice(1).reduce((acc, path) => ({ ...acc, [path]: ['webpack', 'sourcemap'] }), {})
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
    },
  })
}
