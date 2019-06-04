const generatePaths = require('./generate-paths')

const { eslintRcPath } = generatePaths({ packageJsonFolderPath: process.env.INIT_CWD })

module.exports = {
  linters: {
    '*.{js,jsx,ts,tsx,json,d.ts}': [`eslint --config ${eslintRcPath} --fix`, 'git add'],
    '*': [`prettier --write`, 'git add'],
  },
}
