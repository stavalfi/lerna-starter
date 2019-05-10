const { nodeModulesPath, srcPath, eslintRcPath, mainNodeModulesPath } = require('../paths')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  getModule: ({ isDevelopmentMode, isTestMode }) => {
    return {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_module|dist)/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  declarationMap: !isTestMode,
                },
              },
            },
            {
              loader: 'eslint-loader',
              options: {
                failOnError: true,
                failOnWarning: isDevelopmentMode || isTestMode,
                configFile: eslintRcPath,
              },
            },
          ],
        },
      ],
    }
  },
  getResolve: () => ({
    extensions: ['.js', '.sass', '.json', '.ts', '.tsx'],
    modules: [nodeModulesPath, srcPath, mainNodeModulesPath],
  }),
  getPlugins: () => [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],
}
