import { ComponentProps, HTMLAttributes, ReactNode } from 'react'
import styles from './Widget.module.css'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  title?: string
} & HTMLAttributes<HTMLElement>

export function Widget({ children, title, ...rest }: Props) {
  return (
    <div {...rest}>
      <div className={styles.widget}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  )
}

export function WidgetGroup({ children, title, ...rest }: Props) {
  return (
    <div {...rest}>
      <div className={styles.widgetGroup}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.widgetGroupItem}>{children}</div>
      </div>
    </div>
  )
}
