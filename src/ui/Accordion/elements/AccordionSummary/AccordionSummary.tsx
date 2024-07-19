import React, { ReactNode, useContext } from 'react'
import cn from 'classnames'
import { AccordionContext } from '../../AccordionContext'
import styles from './AccordionSummary.module.css'

type Props = {
  id: string
  children: ReactNode
  expandIcon?: ReactNode
}

export function AccordionSummary(props: Props) {
  const { children, expandIcon, ...restPtops } = props
  const { expanded, toggle } = useContext(AccordionContext)

  const handleChange = (e: React.SyntheticEvent) => {
    if (toggle) {
      toggle(e)
    }
  }
  
  return (
    <div
      {...restPtops}
      aria-expanded={expanded}
      className={cn(styles['accordion-summary'], {
        [styles['expanded']]: expanded,
      })}
      onClick={handleChange}
    >
      {children}
      {expandIcon && <div className={styles['icon']}>{expandIcon}</div>}
    </div>
  )
}
