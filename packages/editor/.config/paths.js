const path = require('path')

const rootPath = path.resolve(__dirname, '..')
const configFolderPath = path.resolve(rootPath, '.config')
const webpackConfigPath = path.resolve(configFolderPath, 'webpack', 'webpack.config.js')
const indexHtmlPath = path.resolve(configFolderPath, 'webpack', 'index.html')
const prodTsconfigPath = path.resolve(configFolderPath, 'package-tsconfig.json')
const mainNodeModulesPath = path.resolve(rootPath, '..', '..', 'node_modules')
const srcPath = path.resolve(rootPath, 'src')
const appEntryFilePath = path.resolve(srcPath, 'index.tsx')
const distPath = path.join(rootPath, 'dist')
const babelRcPath = path.join(configFolderPath, '.babelrc.json')
const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
const eslintIgnorePath = path.join(rootPath, '.eslintignore')
const nodeModulesPath = path.resolve(rootPath, 'node_modules')
const testsPath = path.resolve(rootPath, 'test')

const resolveModulesPathsArray = [srcPath, nodeModulesPath, mainNodeModulesPath]
const resolveModulesPathsTestArray = [testsPath, srcPath, nodeModulesPath, mainNodeModulesPath]

module.exports = {
  rootPath,
  webpackConfigPath,
  indexHtmlPath,
  prodTsconfigPath,
  srcPath,
  babelRcPath,
  nodeModulesPath,
  mainNodeModulesPath,
  eslintRcPath,
  eslintIgnorePath,
  distPath,
  appEntryFilePath,
  resolveModulesPathsArray,
  resolveModulesPathsTestArray,
  testsPath,
}
