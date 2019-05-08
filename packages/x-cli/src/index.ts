import awesomeFn from '@stav/x-core'
function cli() {
  console.log('awesomeFn', awesomeFn)
  awesomeFn("222")
  return Promise.resolve(true)
}

cli().then(() => console.log('finish!!'))
