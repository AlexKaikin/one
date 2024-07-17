import { ReactNode } from 'react'
import cn from 'classnames'
import { Spacing } from '../types'
import styles from './List.module.css'

type Props = {
  align?: 'horizontal' | 'vertical'
  children: ReactNode
  spacing?: Spacing
}

export function List({ align = 'vertical', spacing = 1, children }: Props) {
  return (
    <div
      className={cn(styles.list, styles[align], styles[`spacing${spacing}`])}
    >
      {children}
    </div>
  )
}

export function ListItem({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
