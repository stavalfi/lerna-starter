const { resolveModulesPathsArray, resolveModulesPathsTestArray } = require('../paths')

module.exports = ({ isTestMode }) => ({
  extensions: ['.js', '.sass', '.json', '.ts', '.tsx'],
  modules: isTestMode ? resolveModulesPathsTestArray : resolveModulesPathsArray,
})
