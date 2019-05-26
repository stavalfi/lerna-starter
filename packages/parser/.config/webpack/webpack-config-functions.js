const moduleRules = require('./module-rules')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolveModulesPathsArray, resolveModulesPathsTestArray } = require('../paths')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBar = require('webpackbar')

module.exports = {
  getModule: ({ isDevelopmentMode, isTestMode, publicPath = '.' }) => ({
    rules: moduleRules({ isDevelopmentMode, isTestMode, publicPath }),
  }),
  getResolve: ({ isTestMode }) => ({
    extensions: ['.js', '.sass', '.json', '.ts', '.tsx'],
    modules: isTestMode ? resolveModulesPathsTestArray : resolveModulesPathsArray,
  }),
  getPlugins: ({ isDevelopmentMode, isTestMode }) => {
    const productionPlugins = []
    const developmentPlugins = [
      new MiniCssExtractPlugin({
        filename: '[chunkhash].css',
      }),
    ]
    return [
      new WebpackBar({
        name: 'parser',
        ...(!isTestMode && {
          profile: true,
          reporters: ['profile'],
        }),
      }),
      new FriendlyErrorsWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      ...(isDevelopmentMode ? developmentPlugins : productionPlugins),
      new CleanWebpackPlugin(),
    ]
  },
}
