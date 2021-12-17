import { getInput } from '../../helpers/getInput.js'

const input = await getInput(2021, 3)

const data = input.trim().split('\n')

type Bit = '0' | '1'

const getTheMostCommonBit = (bits: string) => {
  const count = { '0': 0, '1': 0 }

  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i] as Bit

    if (++count[bit] > bits.length / 2) {
      return bit
    }
  }

  return null
}

const invertBits = (bits: string) => {
  let invertedBits = ''

  for (let i = 0; i < bits.length; i++) {
    invertedBits += bits[i] === '0' ? '1' : '0'
  }

  return invertedBits
}

// Part One
const gamaRate = data
  .reduce((acc, curr) => {
    for (let i = 0; i < curr.length; i++) {
      if (acc[i]) {
        acc[i] += curr[i]
      } else {
        acc[i] = curr[i]
      }
    }

    return acc
  }, [] as string[])
  .map((bits) => getTheMostCommonBit(bits))
  .join('')

const epsilonRate = invertBits(gamaRate)

let result = parseInt(gamaRate, 2) * parseInt(epsilonRate, 2)

console.log('Part One:', result)

// Part Two
const getRating = (arr: string[], byLeastCommonBit?: boolean) => {
  for (let i = 0; i < arr[0].length; i++) {
    if (arr.length <= 1) {
      break
    }

    let bits = ''

    for (let j = 0; j < arr.length; j++) {
      bits += arr[j][i]
    }

    let defaultBit = '1'
    let bit = getTheMostCommonBit(bits)

    if (byLeastCommonBit) {
      defaultBit = '0'
      bit = bit ? (invertBits(bit) as Bit) : bit
    }

    arr = arr.filter((bits) => bits[i] === (bit === null ? defaultBit : bit))
  }

  return arr[0]
}

const o2Rating = getRating(data)
const co2Rating = getRating(data, true)

result = parseInt(o2Rating, 2) * parseInt(co2Rating, 2)

console.log('Part Two:', result)
