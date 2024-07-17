import { relative } from 'path'

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    .map(f => relative(process.cwd(), f))
    .join(' --file ')}`

const buildPrettierCommand = filenames =>
  `prettier -w --file ${filenames
    .map(f => relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{js,jsx,ts,tsx}': [ buildPrettierCommand],
}
