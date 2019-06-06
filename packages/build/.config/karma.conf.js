const { moduleWithRules, resolve, plugins } = require('./webpack')
const generatePaths = require('./generate-paths')

const paths = generatePaths({ packageDirectoryName: process.env.FOLDER })
const { testsPath } = paths

const isWebApp = process.env.WEBAPP || process.env['WEBAPP']

module.exports = config => {
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
      module: moduleWithRules({ isDevelopmentMode: true, isTestMode: true, isWebApp, paths }),
      resolve: resolve({ isDevelopmentMode: true, isTestMode: true, isWebApp, paths }),
      plugins: plugins({ isDevelopmentMode: true, isTestMode: true, isWebApp, paths }),
    },
    webpackMiddleware: {
      noInfo: true,
    },
  })
}
