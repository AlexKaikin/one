import { ComponentProps, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Badge.module.css'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  value: number
  showZero?: boolean
  variant?: 'dot' | 'number'
  max?: number
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'right'
}

export function Badge(props: Props) {
  const { children, value, variant, ...restProps } = props

  return (
    <div className={styles.badge} {...restProps}>
      {!!value && (
        <span
          className={cn(styles.value, { [styles['dot']]: variant === 'dot' })}
        >
          {variant !== 'dot' && value}
        </span>
      )}
      {children}
    </div>
  )
}
