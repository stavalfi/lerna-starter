import { r1, f } from '@stavalfi/library1'
const x: r1 = 3
function cli() {
  return Promise.resolve(true)
}

const y: f = (x: number) => `${x}`
console.log(y(1))
cli().then(() => console.log('finish!!'))

console.log(x)
