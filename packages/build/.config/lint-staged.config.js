const generatePaths = require('./generate-paths')

const { eslintRcPath } = generatePaths({
  packageDirectoryName: process.env.FOLDER,
})

module.exports = {
  linters: {
    '*.{js,jsx,ts,tsx,json,d.ts}': [`eslint --config ${eslintRcPath} --fix`, 'git add'],
    '*': [`prettier --write`, 'git add'],
  },
}
