const { nodeModulesPath, srcPath, mainNodeModulesPath } = require('../paths')
const moduleRules = require('./module-rules')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  getModule: ({ isDevelopmentMode, isTestMode, publicPath = '.' }) => ({
    rules: moduleRules({ isDevelopmentMode, isTestMode, publicPath }),
  }),
  getResolve: () => ({
    extensions: ['.js', '.sass', '.json', '.ts', '.tsx'],
    modules: [nodeModulesPath, srcPath, mainNodeModulesPath],
  }),
  getPlugins: ({ isDevelopmentMode }) => {
    const productionPlugins = []
    const developmentPlugins = [
      new MiniCssExtractPlugin({
        filename: '[chunkhash].css',
      }),
    ]
    return [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      ...(isDevelopmentMode ? developmentPlugins : productionPlugins),
    ]
  },
}
