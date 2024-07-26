export function uuid() {
  const rand = 1000000000 + Math.random() * (9999999999 + 1 - 1000000000)
  return String(Math.floor(rand))
}
