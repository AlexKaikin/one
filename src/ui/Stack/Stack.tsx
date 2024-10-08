'use client'

import { ComponentProps, CSSProperties, ReactNode } from 'react'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  spacing?: number
  isWide?: boolean
  display?: CSSProperties['display']
  flexWrap?: CSSProperties['flexWrap']
  alignItems?: CSSProperties['alignItems']
  overflow?: CSSProperties['overflow']
  flexDirection?: CSSProperties['flexDirection']
  justifyContent?: CSSProperties['justifyContent']
}

export function Stack(props: Props) {
  const {
    children,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    overflow,
    spacing,
    style,
    isWide,
    flexWrap,
    ...rest
  } = props

  return (
    <div
      style={{
        display: display || 'flex',
        flexDirection,
        flexWrap,
        justifyContent,
        alignItems,
        overflow,
        gap: spacing ? `calc(var(--spacing) * ${spacing})` : '0',
        width: isWide ? '100%' : 'auto',
        height: isWide ? '100%' : 'auto',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
