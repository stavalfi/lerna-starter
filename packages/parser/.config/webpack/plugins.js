const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = ({ isDevelopmentMode }) => {
  const productionPlugins = []
  const developmentPlugins = [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
  ]
  return [
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    ...(isDevelopmentMode ? developmentPlugins : productionPlugins),
    new CleanWebpackPlugin(),
  ]
}
