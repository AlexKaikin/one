import { ComponentProps, CSSProperties, ReactNode } from 'react'
import cn from 'classnames'

type Props = ComponentProps<'div'> & {
  children: ReactNode
  gap?: number
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
    gap,
    className,
    style,
    isWide,
    ...rest
  } = props

  return (
    <div
      style={{
        display: display || 'flex',
        flexDirection,
        justifyContent,
        gap: gap ? `calc(var(--spacing) * ${gap})` : '0',
        width: isWide ? '100%' : 'auto',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
