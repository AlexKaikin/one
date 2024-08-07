import { ComponentProps, CSSProperties, ReactNode } from 'react'
import cn from 'classnames'
import { Size, Color, Variant } from '../types'
import styles from './Button.module.css'

type Props = ComponentProps<'button'> & {
  size?: Size
  color?: Color
  variant?: Variant
  endIcon?: ReactNode
  children?: ReactNode
  startIcon?: ReactNode
  isFullWidth?: boolean
}

export function Button(props: Props) {
  const {
    size,
    color,
    variant,
    endIcon,
    children,
    startIcon,
    isFullWidth,
    className,
    ...restProps
  } = props

  return (
    <button
      type="button"
      className={cn(styles.btn, className, {
        [styles.fullWidth]: isFullWidth,
        [styles[size || 'medium']]: size,
        [styles[color || 'primary']]: color,
        [styles[variant || 'contained']]: variant,
      })}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )
}
