# A Full-Featured Lerna Starter

[![CircleCI](https://circleci.com/gh/stavalfi/lerna-starter/tree/master.svg?style=svg)](https://circleci.com/gh/stavalfi/lerna-starter/tree/master)

##### Main devDependencies

- Lerna 3.6
- yarn workspaces
- Webpack 4
- Babel 7.4
- Typescript 3.4
- karma 4
- Eslint with Typescript
- Prettier

##### Main dependencies

- React
- React-hot-loader

---

Projects:

- consumer
- library1

`consumer` project depends on `library1` project.

Notes:

1. `library1` will produce valid `*.d.ts` files.
2. `consumer` will react to any type change from `library1`.
3. The compilation proccess is fast. Webstorm-typescript integration sucks. use your terminal to see real-time typescript/eslint/webpack-build errors - it will ne much faster.
4. In each project, Karma uses the project's Webpack configuration so you get all the features you already have: typescript, absolute paths and more.

---

PRs are welcome!
