const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = ({
  isDevelopmentMode,
  isTestMode,
  constants: { isWebApp, packageDirectoryName, isCI },
  paths: { linterTsconfigPath, indexHtmlPath },
}) => {
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
    ...(!isCI
      ? [
          new ProgressBarPlugin({
            format: `Building ${packageDirectoryName} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
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
