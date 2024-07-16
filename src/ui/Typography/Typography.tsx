import React from 'react'
import type { ElementType, HTMLAttributes } from 'react'
import cn from 'classnames'
import { fontVariants } from '../types'
import styles from './Typography.module.css'

type Props = {
  variant: fontVariants
  tag?: fontVariants
} & HTMLAttributes<HTMLElement>

export function Typography(props: Props) {
  const { children, variant, tag = variant, ...restProps } = props
  const CustomTag: ElementType = `${tag}`

  return (
    <CustomTag className={cn(styles[variant])} {...restProps}>
      {children}
    </CustomTag>
  )
}
