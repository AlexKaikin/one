'use client'

import React, { ReactNode, SyntheticEvent, useCallback, useMemo } from 'react'
import cn from 'classnames'
import styles from './Accordion.module.css'
import { AccordionContext } from './AccordionContext'
import { useControlled } from './useControlled'

type Props = {
  expanded?: boolean
  defaultExpanded?: boolean
  disabled?: boolean
  children: ReactNode
  shadow?: boolean
  onChange?: (e: SyntheticEvent, expanded: boolean) => void
}

export function Accordion(props: Props) {
  const {
    children,
    disabled,
    onChange,
    shadow = true,
    expanded: expandedProp,
    defaultExpanded = false,
  } = props
  const [expanded, setExpanded] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
  })
  const handleChange = useCallback(
    (e: SyntheticEvent) => {
      setExpanded(!expanded)

      if (onChange) {
        onChange(e, !expanded)
      }
    },
    [expanded, setExpanded, onChange]
  )
  const contextValue = useMemo(
    () => ({ expanded, toggle: handleChange }),
    [expanded, handleChange]
  )
  return (
    <div
      className={cn(styles.accordion, {
        [styles['expanded']]: expanded,
        [styles['disabled']]: disabled,
        [styles['shadow']]: shadow,
      })}
    >
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </div>
  )
}
