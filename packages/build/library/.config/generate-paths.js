const path = require('path')

const packageDirectoryName = process.env.FOLDER
console.log('process.env: ', process.env)
const currentPackageRootPath = path.resolve(__dirname, '..')
const configFolderPath = path.resolve(currentPackageRootPath, '.config')

module.exports = ({ packageJsonFolderPath }) => {
  console.log('packageJsonFolderPath: ', packageJsonFolderPath)
  console.log('packageDirectoryName: ', packageDirectoryName)
  const fixedPackageJsonFolderPath = packageJsonFolderPath.endsWith('lerna-starter')
    ? path.resolve(packageJsonFolderPath, 'packages', packageDirectoryName)
    : packageJsonFolderPath
  const rootPath = fixedPackageJsonFolderPath
  const webpackConfigPath = path.resolve(configFolderPath, 'webpack', 'webpack.config.js')
  const prodTsconfigPath = path.resolve(configFolderPath, 'tsconfig.json')
  const linterTsconfigPath = path.resolve(fixedPackageJsonFolderPath, 'tsconfig.json')
  const mainNodeModulesPath = path.resolve(rootPath, '..', '..', 'node_modules')
  const srcPath = path.resolve(rootPath, 'src')
  const appEntryFilePath = path.resolve(srcPath, 'index.ts')
  const distPath = path.join(rootPath, 'dist')
  const babelRcPath = path.join(configFolderPath, '.babelrc.js')
  const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
  const eslintIgnorePath = path.join(rootPath, '.eslintignore')
  const nodeModulesPath = path.resolve(rootPath, 'node_modules')
  const testsPath = path.resolve(rootPath, 'test')

  const resolveModulesPathsArray = [srcPath, nodeModulesPath, mainNodeModulesPath]
  const resolveModulesPathsTestArray = [testsPath, srcPath, nodeModulesPath, mainNodeModulesPath]

  return {
    packageJsonFolderPath: fixedPackageJsonFolderPath,
    rootPath,
    webpackConfigPath,
    prodTsconfigPath,
    srcPath,
    babelRcPath,
    nodeModulesPath,
    linterTsconfigPath,
    mainNodeModulesPath,
    eslintRcPath,
    eslintIgnorePath,
    distPath,
    appEntryFilePath,
    resolveModulesPathsArray,
    resolveModulesPathsTestArray,
    testsPath,
  }
}
