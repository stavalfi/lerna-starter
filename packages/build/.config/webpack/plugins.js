const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({ isDevelopmentMode, isTestMode, isWebApp, paths: { linterTsconfigPath, indexHtmlPath } }) => {
  const productionPlugins = [
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css',
    }),
  ]
  const developmentPlugins = []
  return [
    ...(isWebApp
      ? [
          new HtmlWebpackPlugin({
            template: indexHtmlPath,
          }),
        ]
      : []),
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: linterTsconfigPath,
      async: false,
    }),
    ...(isDevelopmentMode ? developmentPlugins : productionPlugins),
    ...(isTestMode ? [new CleanWebpackPlugin()] : []),
  ]
}
