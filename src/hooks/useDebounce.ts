import { useEffect, useRef, useState } from 'react'

export function useDebounce<Type extends any>(value: Type, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<Type>(value)
  const timerRef: { current: ReturnType<typeof setTimeout> | undefined } =
    useRef()

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}
