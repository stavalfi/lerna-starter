const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const rootPath = path.resolve(__dirname)
const currentProjectPaths = {
  src: path.resolve(rootPath, 'src'),
  components: path.resolve(rootPath, 'src', 'components'),
  nodeModules: path.resolve(rootPath, 'node_modules'),
  dist: path.resolve(rootPath, 'dist'),
}

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'
  return {
    devtool: 'source-map',

    entry: {
      index: [path.resolve(currentProjectPaths.src, 'index.ts')],
    },

    output: {
      path: currentProjectPaths.dist,
      filename: '[name].js',
      libraryTarget: 'umd',
    },

    resolve: {
      extensions: ['.js', '.sass', '.json', '.ts', '.tsx'],
      modules: [currentProjectPaths.nodeModules, currentProjectPaths.src],
    },

    plugins: [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()],

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_module|dist)/,
          use: [
            'babel-loader',
            'ts-loader',
            {
              loader: 'eslint-loader',
              options: {
                failOnError: true,
                failOnWarning: true,
                configFile: path.join(rootPath, '.eslintrc'),
              },
            },
          ],
        },
      ],
    },
  }
}
