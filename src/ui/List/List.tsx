import { ReactNode } from 'react'
import styles from './List.module.css'

export function List({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}

export function ListItem({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}