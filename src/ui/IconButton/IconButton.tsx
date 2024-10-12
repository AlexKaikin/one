'use client'

import { ComponentProps, ReactNode, Ref, forwardRef } from 'react'
import cn from 'classnames'
import { Color, Variant } from '../types'
import styles from './IconButton.module.css'

type Props = ComponentProps<'button'> & {
  color?: Color
  variant?: Variant
  children: ReactNode
  spacing?: number
}

function ForwardRef(props: Props, ref: Ref<HTMLButtonElement>) {
  const { color, variant, spacing, children, ...rest } = props
  const padding = `calc(var(--spacing) * ${spacing || 1})`

  return (
    <button
      ref={ref}
      className={cn(styles.btn, {
        [styles[color || 'primary']]: color,
        [styles[variant || 'contained']]: variant,
      })}
      style={{ padding }}
      {...rest}
    >
      {children}
    </button>
  )
}

export const IconButton = forwardRef(ForwardRef)
