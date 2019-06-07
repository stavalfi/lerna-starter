const path = require('path')
const { isWebApp, packageDirectoryName } = require('./constants')

const currentPackageRootPath = path.resolve(__dirname, '..', '..')
const packagesPath = path.resolve(currentPackageRootPath, '..')
const configFolderPath = path.resolve(currentPackageRootPath, '.config')

const packageJsonFolderPath = path.resolve(packagesPath, packageDirectoryName)
const webpackConfigPath = path.resolve(configFolderPath, 'webpack', 'webpack.config.js')
const libTsconfigPath = path.resolve(configFolderPath, 'lib-tsconfig.json')
const linterTsconfigPath = path.resolve(packageJsonFolderPath, 'tsconfig.json')
const mainNodeModulesPath = path.resolve(packageJsonFolderPath, '..', '..', 'node_modules')
const srcPath = path.resolve(packageJsonFolderPath, 'src')
const appEntryFilePaths = [path.resolve(srcPath, isWebApp ? 'index.tsx' : 'index.ts')]
const distPath = path.join(packageJsonFolderPath, 'dist')
const babelRcPath = path.join(configFolderPath, '.babelrc.js')
const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
const eslintIgnorePath = path.join(packageJsonFolderPath, '.eslintignore')
const nodeModulesPath = path.resolve(packageJsonFolderPath, 'node_modules')
const testsPath = path.resolve(packageJsonFolderPath, 'test')
const indexHtmlPath = path.resolve(configFolderPath, 'webpack', 'index.html')

const resolveModulesPathsArray = [srcPath, nodeModulesPath, mainNodeModulesPath]
const resolveModulesPathsTestArray = [testsPath, srcPath, nodeModulesPath, mainNodeModulesPath]

module.exports = {
  packagesPath,
  packageJsonFolderPath,
  webpackConfigPath,
  libTsconfigPath,
  srcPath,
  babelRcPath,
  nodeModulesPath,
  linterTsconfigPath,
  mainNodeModulesPath,
  eslintRcPath,
  eslintIgnorePath,
  distPath,
  appEntryFilePaths,
  resolveModulesPathsArray,
  resolveModulesPathsTestArray,
  testsPath,
  indexHtmlPath,
}
