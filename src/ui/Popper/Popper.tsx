'use client'

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useWindowDimensions } from '@/hooks'

type Props = {
  open: boolean
  children: ReactNode
  anchorEl: any
}

type Style = {}

const defaultStyle = {
  position: 'absolute',
  //   top: '0',
  //   left: '0',
  zIndex: '1',
  //  transform: 'auto',
}

export function Popper({ open, children, anchorEl }: Props) {
  const portalRef = useRef<any | null>(null)
  const { height, width } = useWindowDimensions()
  const [style, setStyle] = useState<Style>(defaultStyle)

  useLayoutEffect(() => {
    if (open && portalRef.current && height && width) {
      const portalRect = portalRef.current.getBoundingClientRect()

      if (portalRect.right > width) {
        setStyle(prev => ({ ...prev, right: `0px` }))
      }

      if (portalRect.bottom > height) {
        setStyle(prev => ({ ...prev, top: `-30px` }))
      }

      if (portalRect.left < 0) {
        setStyle(prev => ({ ...prev, left: `10px` }))
      }

      if (portalRect.top < 0) {
        setStyle(prev => ({ ...prev, top: `10px` }))
      }
    }
  }, [height, width, open, setStyle])

  useEffect(() => {
    if (!open) setStyle(defaultStyle)
  }, [open])

  return (
    <>
      {open &&
        createPortal(
          <div ref={portalRef} style={style}>
            {children}
          </div>,
          anchorEl.current
        )}
    </>
  )
}
