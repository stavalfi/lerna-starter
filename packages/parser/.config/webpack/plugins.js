const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { packageTsconfigPath } = require('../paths')
module.exports = ({ isDevelopmentMode }) => {
  const productionPlugins = [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
  ]
  const developmentPlugins = []
  return [
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: packageTsconfigPath,
      async: false,
    }),
    ...(isDevelopmentMode ? developmentPlugins : productionPlugins),
    new CleanWebpackPlugin(),
  ]
}
