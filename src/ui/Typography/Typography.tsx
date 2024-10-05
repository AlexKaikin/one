import React from 'react'
import type { CSSProperties, ElementType, HTMLAttributes } from 'react'
import cn from 'classnames'
import { fontVariants } from '../types'
import styles from './Typography.module.css'

type Props = {
  variant: fontVariants
  tag?: fontVariants
  align?: CSSProperties['textAlign']
  italic?: boolean
} & HTMLAttributes<HTMLElement>

export function Typography(props: Props) {
  const { children, variant, align = 'left', italic, tag = variant, ...restProps } = props
  const CustomTag: ElementType = `${tag}`

  return (
    <CustomTag
      className={cn(styles[variant], { [styles['italic']]: italic })}
      {...restProps}
      style={{ textAlign: align }}
    >
      {children}
    </CustomTag>
  )
}
