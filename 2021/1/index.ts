import { getInput } from '../../helpers/getInput.js'

const input = await getInput(2021, 1)

const data = input
  .trim()
  .split('\n')
  .map((value) => parseInt(value, 10))

// Part One
let count = 0

for (let i = 1; i < data.length; i++) {
  if (data[i] > data[i - 1]) {
    count++
  }
}

console.log('Part One:', count)

// Part Two
count = 0

const calculateWindow = (i: number) => data[i] + data[i + 1] + data[i + 2]

let previousWindow = calculateWindow(0)

for (let i = 1; i < data.length; i++) {
  if (i > data.length - 3) {
    break
  }

  const currentWindow = calculateWindow(i)

  if (currentWindow > previousWindow) {
    count++
  }

  previousWindow = currentWindow
}

console.log('Part Two:', count)
