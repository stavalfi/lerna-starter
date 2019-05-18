const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const jsonImporter = require('node-sass-json-importer')
const { resolveModulesPathsArray, eslintRcPath } = require('../paths')

module.exports = ({ isDevelopmentMode, isTestMode, publicPath = '.' }) => {
  return [
    {
      test: /\.(ts|js)x?$/,
      exclude: /(node_module|dist)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        ...(isTestMode
          ? []
          : [
              {
                loader: 'ts-loader',
              },
              {
                loader: '@stavalfi/babel-plugin-module-resolver-loader',
                options: {
                  root: resolveModulesPathsArray,
                  extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx'],
                },
              },
            ]),
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
    {
      test: /\.css$/,
      loaders: [isDevelopmentMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        {
          loader: 'file-loader',
          options: {
            query: {
              name: 'assets/[hash].[name].[ext]',
            },
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
            },
          },
        },
      ],
    },
    {
      test: /\.font\.js$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'webfonts-loader',
          options: {
            types: 'ttf',
            publicPath,
            baseSelector: '.sf',
          },
        },
      ],
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
      test: /\.(scss|sass)$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            indentedSyntax: true,
            importer: jsonImporter,
          },
        },
      ],
      exclude: /(node_modules)/,
    },
  ]
}
