import { awesomeFn } from '@quramy/x-core'

export function cli() {
  awesomeFn(123)
  return Promise.resolve(true)
}

cli()
