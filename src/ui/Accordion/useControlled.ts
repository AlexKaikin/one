'use client'

import { SetStateAction, useCallback, useRef, useState } from 'react'

export interface Props<T = unknown> {
  controlled: T
  default: T
}

export function useControlled<T = unknown>(
  props: Props<T>
): [T, (newValue: T | ((prevValue: T) => T)) => void] {
  const { controlled, default: defaultProp } = props
  const { current: isControlled } = useRef(controlled !== undefined)
  const [valueState, setValueState] = useState(defaultProp)
  const value = isControlled ? controlled : valueState
  const setValueIfUncontrolled = useCallback((newValue: SetStateAction<T>) => {
    if (!isControlled) {
      setValueState(newValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [value, setValueIfUncontrolled]
}
