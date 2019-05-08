import { awesomeFn } from '@quramy/x-core'

export function cli() {
  console.log(awesomeFn)
  awesomeFn(123)
  return Promise.resolve(true)
}

cli().then(() => console.log('finish!!'))
