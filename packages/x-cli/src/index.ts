import awesomeFn from '@stav/x-core'
function cli() {
  console.log('awesomeFn', awesomeFn)
  awesomeFn(22)
  return Promise.resolve(true)
}

cli().then(() => console.log('finish!!'))
