import { getInput } from '../../helpers/getInput.js'

const input = await getInput(2021, 4)

const [numbersData, ...boardsData] = input.trim().split('\n\n')

const numbers = numbersData.split(',').map((n) => parseInt(n, 10))

const boards = boardsData.map((board) =>
  board.split('\n').map((row) =>
    row
      .split(' ')
      .map((n) => parseInt(n, 10))
      .filter(Number.isFinite)
  )
)

type WinningBoard = {
  board: number[]
  numbers: number[]
}

const getWinningBoards = (): WinningBoard[] => {
  const count: { rows: number[]; cols: number[] }[] = []
  const calledNumbers: WinningBoard['numbers'] = []
  const winningBoards: Array<WinningBoard & { order: number }> = []
  let order = 0

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]

    calledNumbers.push(number)

    for (let j = 0; j < boards.length; j++) {
      if (winningBoards[j]) continue

      const board = boards[j]

      if (!count[j]) count[j] = { rows: [], cols: [] }

      for (let row = 0; row < board.length; row++) {
        if (winningBoards[j]) continue

        const col = board[row].indexOf(number)

        if (col !== -1) {
          count[j].rows[row] ? count[j].rows[row]++ : (count[j].rows[row] = 1)
          count[j].cols[col] ? count[j].cols[col]++ : (count[j].cols[col] = 1)
        }

        if (
          count[j].rows.indexOf(5) !== -1 ||
          count[j].cols.indexOf(5) !== -1
        ) {
          winningBoards[j] = {
            board: board.flat(),
            numbers: [...calledNumbers],
            order
          }

          order++
        }
      }
    }
  }

  return winningBoards
    .sort((a, b) => a.order - b.order)
    .map(({ board, numbers }) => ({ board, numbers }))
}

const getScore = ({ board, numbers }: WinningBoard) =>
  board
    .filter((n) => !numbers.includes(n))
    .reduce((acc, curr) => acc + curr, 0) * numbers[numbers.length - 1]

const winningBoards = getWinningBoards()

// Part One
let result = getScore(winningBoards[0])

console.log('Part One:', result)

// Part Two
result = getScore(winningBoards[winningBoards.length - 1])

console.log('Part Two:', result)
