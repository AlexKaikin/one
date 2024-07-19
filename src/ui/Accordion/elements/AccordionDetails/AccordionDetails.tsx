'use client'

import React, { ReactNode, useContext, useRef } from 'react'
import cn from 'classnames'
import { AccordionContext } from '../../AccordionContext'
import styles from './AccordionDetails.module.css'

type Props = { children: ReactNode }

export function AccordionDetails(props: Props) {
  const { children } = props
  const { expanded } = useContext(AccordionContext)
  const ref = useRef<HTMLDivElement | null>(null)
  const style = expanded
    ? { height: (ref?.current?.scrollHeight || 0) + 20 }
    : { height: '0' }

  return (
    <div
      ref={ref}
      style={style}
      className={cn(styles['accordion-details'], {
        [styles['expanded']]: expanded,
      })}
    >
      {children}
    </div>
  )
}
