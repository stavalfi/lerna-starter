module.exports = ({ isTestMode, paths: { resolveModulesPathsArray, resolveModulesPathsTestArray } }) => ({
  extensions: ['.js', '.sass', '.json', '.ts', '.tsx'],
  modules: isTestMode ? resolveModulesPathsTestArray : resolveModulesPathsArray,
})
