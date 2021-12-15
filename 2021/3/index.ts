import { getInput } from '../../helpers/getInput.js'

const input = await getInput(2021, 3)

const data = input
  .trim()
  .split('\n')
  .map((line) => line.split(''))

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
  }, [])
  .reduce((acc, curr) => {
    const numbers = curr.split('')
    const count = { zero: 0, one: 0 }

    for (let i = 0; i < numbers.length; i++) {
      switch (numbers[i]) {
        case '0':
          count.zero++
          break
        case '1':
          count.one++
          break
      }
    }

    if (count.zero > count.one) {
      return (acc += '0')
    }

    return (acc += '1')
  }, '')

const epsilonRate = gamaRate.split('').reduce((acc, curr) => {
  switch (curr) {
    case '0':
      return (acc += '1')

    case '1':
      return (acc += '0')

    default:
      return (acc += '')
  }
}, '')

const powerConsumption = parseInt(gamaRate, 2) * parseInt(epsilonRate, 2)

console.log('Part One:', powerConsumption)

// Part Two
let oxygenGeneratorRating = data
let co2ScrubberRating = data

for (let i = 0; i < oxygenGeneratorRating[0].length; i++) {
  let count = { zero: 0, one: 0 }

  for (let j = 0; j < oxygenGeneratorRating.length; j++) {
    switch (oxygenGeneratorRating[j][i]) {
      case '0':
        count.zero++
        break
      case '1':
        count.one++
        break
    }
  }

  let filterBy = count.one >= count.zero ? '1' : '0'

  if (oxygenGeneratorRating.length > 1) {
    oxygenGeneratorRating = oxygenGeneratorRating.filter(
      (line) => line[i] === filterBy
    )
  }

  count = { zero: 0, one: 0 }

  for (let j = 0; j < co2ScrubberRating.length; j++) {
    switch (co2ScrubberRating[j][i]) {
      case '0':
        count.zero++
        break
      case '1':
        count.one++
        break
    }
  }

  filterBy = count.zero <= count.one ? '0' : '1'

  if (co2ScrubberRating.length > 1) {
    co2ScrubberRating = co2ScrubberRating.filter((line) => line[i] === filterBy)
  }
}

const oxygenGeneratorRatingDecimal = parseInt(
  oxygenGeneratorRating[0].join(''),
  2
)

const co2ScrubberRatingDecimal = parseInt(co2ScrubberRating[0].join(''), 2)

const lifeSupportRating =
  oxygenGeneratorRatingDecimal * co2ScrubberRatingDecimal

console.log('Part Two:', lifeSupportRating)
