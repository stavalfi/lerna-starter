import webpack from 'webpack'
import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const rootPath = path.resolve(__dirname)
const srcPath = path.resolve(rootPath, 'src')
const distPath = path.resolve(rootPath, 'dist')

const config: webpack.Configuration = {
  entry: {
    app: [path.resolve(srcPath, 'index.ts')],
  },

  output: {
    path: distPath,
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg(\?.*)?$/,
        loaders: ['url-loader?limit=10000&mimetype=image/svg+xml'],
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject',
      },

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
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

  plugins: [
    new CleanWebpackPlugin()
  ],

  devtool: 'source-map',
}

export default config
