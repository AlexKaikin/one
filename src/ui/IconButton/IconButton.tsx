'use client'

import { ComponentProps, ReactNode, Ref, forwardRef } from 'react'
import cn from 'classnames'
import { Color, Variant } from '../types'
import styles from './IconButton.module.css'

type Props = ComponentProps<'button'> & {
  color?: Color
  variant?: Variant
  children: ReactNode
}

function ForwardRef(props: Props, ref: Ref<HTMLButtonElement>) {
  const { color, variant, children, ...rest } = props

  return (
    <button
      ref={ref}
      className={cn(styles.btn, {
        [styles[color || 'primary']]: color,
        [styles[variant || 'contained']]: variant,
      })}
      {...rest}
    >
      {children}
    </button>
  )
}

export const IconButton = forwardRef(ForwardRef)
