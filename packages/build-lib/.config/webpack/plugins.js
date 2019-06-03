const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = ({ isDevelopmentMode, paths: { prodTsconfigPath } }) => {
  const productionPlugins = [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
  ]
  const developmentPlugins = []
  return [
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: prodTsconfigPath,
      async: false,
    }),
    ...(isDevelopmentMode ? developmentPlugins : productionPlugins),
    new CleanWebpackPlugin(),
  ]
}
