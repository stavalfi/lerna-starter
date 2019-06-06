const { moduleWithRules, resolve, plugins } = require('./webpack')
const generatePaths = require('./generate-paths')

const paths = generatePaths({ packageDirectoryName: process.env.FOLDER })
const { testsPath } = paths

module.exports = config => {
  const files = [
    `${testsPath}/utils/import-polyfills.ts`,
    `${testsPath}/*.spec.ts`,
    `${testsPath}/**/*.spec.ts`,
    `${testsPath}/*.spec.js`,
    `${testsPath}/**/*.spec.js`,
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
      module: moduleWithRules({ isDevelopmentMode: true, isTestMode: true, paths }),
      resolve: resolve({ isDevelopmentMode: true, isTestMode: true, paths }),
      plugins: plugins({ isDevelopmentMode: true, isTestMode: true, paths }),
    },
    webpackMiddleware: {
      noInfo: true,
    },
  })
}
