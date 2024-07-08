import { ReactNode } from 'react'
import cn from 'classnames'
import styles from './List.module.css'

type Props = {
  align?: 'horizontal' | 'vertical'
  children: ReactNode
}

export function List({ align = 'vertical', children }: Props) {
  return <div className={cn(styles.list, styles[align])}>{children}</div>
}

export function ListItem({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}
