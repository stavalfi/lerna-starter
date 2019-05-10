const { getPlugins, getModule, getResolve } = require('./webpack/webpack-config-functions')

module.exports = config => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai', 'chai'],
    reporters: ['spec'],
    files: ['src/*.spec.ts', 'src/**/*.spec.ts'],
    preprocessors: {
      'src/*.spec.ts': ['webpack'],
      'src/**/*.spec.ts': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: getModule({ isDevelopmentMode: true, isTestMode: true }),
      resolve: getResolve(),
      plugins: getPlugins(),
    },
    webpackMiddleware: {
      noInfo: true,
    },
  })
}
