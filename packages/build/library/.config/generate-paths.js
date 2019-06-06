const path = require('path')

// console.log('process.env: ', process.env)
const currentPackageRootPath = path.resolve(__dirname, '..')
const packagesPath = path.resolve(currentPackageRootPath, '..', '..')
const configFolderPath = path.resolve(currentPackageRootPath, '.config')

module.exports = () => {
  const packageDirectoryName = process.env.FOLDER || process.env['FOLDER']
  console.log('lib - packageDirectoryName: ', packageDirectoryName)
  const packageJsonFolderPath = path.resolve(packagesPath, packageDirectoryName)
  const webpackConfigPath = path.resolve(configFolderPath, 'webpack', 'webpack.config.js')
  const prodTsconfigPath = path.resolve(configFolderPath, 'tsconfig.json')
  const linterTsconfigPath = path.resolve(packageJsonFolderPath, 'tsconfig.json')
  const mainNodeModulesPath = path.resolve(packageJsonFolderPath, '..', '..', 'node_modules')
  const srcPath = path.resolve(packageJsonFolderPath, 'src')
  const appEntryFilePath = path.resolve(srcPath, 'index.ts')
  const distPath = path.join(packageJsonFolderPath, 'dist')
  const babelRcPath = path.join(configFolderPath, '.babelrc.js')
  const eslintRcPath = path.join(configFolderPath, '.eslintrc.js')
  const eslintIgnorePath = path.join(packageJsonFolderPath, '.eslintignore')
  const nodeModulesPath = path.resolve(packageJsonFolderPath, 'node_modules')
  const testsPath = path.resolve(packageJsonFolderPath, 'test')

  const resolveModulesPathsArray = [srcPath, nodeModulesPath, mainNodeModulesPath]
  const resolveModulesPathsTestArray = [testsPath, srcPath, nodeModulesPath, mainNodeModulesPath]

  return {
    packagesPath,
    packageJsonFolderPath,
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
