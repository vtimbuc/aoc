import { getInput } from '../../helpers/getInput.js'

const input = await getInput(2021, 2)

const data = input
  .trim()
  .split('\n')
  .map((line) => {
    const [direction, amount] = line.split(' ')

    return { direction, amount: parseInt(amount) }
  })

// Part One
let horizontalPosition = 0
let depth = 0

for (let i = 0; i < data.length; i++) {
  const { direction, amount } = data[i]

  switch (direction) {
    case 'forward':
      horizontalPosition += amount
      break
    case 'down':
      depth += amount
      break
    case 'up':
      depth -= amount
      break
  }
}

let result = horizontalPosition * depth

console.log('Part One:', result)

// Part Two
horizontalPosition = 0
depth = 0
let aim = 0

for (let i = 0; i < data.length; i++) {
  const { direction, amount } = data[i]

  switch (direction) {
    case 'forward':
      horizontalPosition += amount
      depth += aim * amount
      break
    case 'down':
      aim += amount
      break
    case 'up':
      aim -= amount
      break
  }
}

result = horizontalPosition * depth

console.log('Part Two:', result)
