export function ensureSpaceAfterComma(str: string) {
  return str.replace(/,(?!\s)/g, ', ') // adds a space after the comma if there is none
}
