import fs from 'fs'
import path from 'path'
import util from 'util'

const readFile = util.promisify(fs.readFile)

export const getInput = (year, day) => {
  const file = path.resolve(year.toString(), day.toString(), 'input.txt')

  return readFile(file, 'utf-8')
}
