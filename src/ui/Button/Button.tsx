import { ComponentProps, CSSProperties, ReactNode } from 'react'
import cn from 'classnames'
import Link from 'next/link'
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
  spacing?: number
  href?: string
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
    href,
    spacing = 1,
    ...restProps
  } = props

  const button = () => (
    <button
      type="button"
      className={cn(styles.btn, className, {
        [styles.fullWidth]: isFullWidth,
        [styles[size || 'medium']]: size,
        [styles[color || 'primary']]: color,
        [styles[variant || 'contained']]: variant,
        [styles[`spacing${spacing}`]]: spacing,
      })}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  )

  if (href) {
    return <Link href={href}>{button()}</Link>
  }

  return <>{button()}</>
}
