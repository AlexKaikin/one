import { ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Table.module.css'

type Props = ComponentProps<'div'> & { children: ReactNode }

export function Table({ children, ...rest }: Props) {
  return (
    <div className={styles.table} {...rest}>
      {children}
    </div>
  )
}

export function TableRow({ children, onClick, ...rest }: Props) {
  return (
    <div
      className={cn(styles.row, { [styles['link']]: !!onClick })}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

export function TableCell({ children, ...rest }: Props) {
  return (
    <div className={styles.cell} {...rest}>
      {children}
    </div>
  )
}
