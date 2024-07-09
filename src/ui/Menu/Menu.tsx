'use client'

import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useOnClickOutside, useWindowDimensions } from '@/hooks'
import { Icon } from '../Icon/Icon'
import { IconButton } from '../IconButton/IconButton'
import styles from './Menu.module.css'
import { MenuContext, MenuContextType, MenuProvider } from './context'

type MenuProps = {
  trigger?: ReactNode
  children: ReactNode
  href?: string
}
type Props = { trigger: ReactNode; href?: string; children: ReactNode }

export function Menu(props: MenuProps) {
  return (
    <MenuProvider>
      <MenuWithContext {...props} />
    </MenuProvider>
  )
}

export function MenuWithContext({ trigger, href, children }: MenuProps) {
  const { open, setOpen } = useContext(MenuContext) as MenuContextType
  const { height, width } = useWindowDimensions()
  const [style, setStyle] = useState({})

  const ref = useRef<any | null>(null)
  const portalRef = useRef<any | null>(null)

  useOnClickOutside(ref, () => setOpen(false))

  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  useEffect(() => {
    setOpen(false)
  }, [search, setOpen])

  useEffect(() => {
    if (open && portalRef.current && height && width) {
      const portalRect = portalRef.current.getBoundingClientRect()

      if (portalRect.right > width) {
        setStyle(prev => ({ ...prev, right: `10px` }))
      }

      if (portalRect.bottom > height) {
        setStyle(prev => ({ ...prev, bottom: `10px` }))
      }

      if (portalRect.left < 0) {
        setStyle(prev => ({ ...prev, left: `10px` }))
      }

      if (portalRect.top < 0) {
        setStyle(prev => ({ ...prev, top: `10px` }))
      }
    }
  }, [height, width, style, open])

  return (
    <div ref={ref} className={styles.menu}>
      <div className={styles.trigger}>
        {href ? (
          <Link href={href || '#'} onClick={() => setOpen(false)}>
            {trigger}
          </Link>
        ) : (
          <div className={styles.triggerButton} onClick={() => setOpen(!open)}>
            {trigger}
          </div>
        )}

        {!!href && (
          <IconButton variant="text" onClick={() => setOpen(!open)}>
            <Icon name="arrowDropDown" />
          </IconButton>
        )}
      </div>

      {open &&
        createPortal(
          <div ref={portalRef} className={styles.menuItems} style={style}>
            {children}
          </div>,
          ref.current
        )}
    </div>
  )
}

export function MenuItem({ children }: { children: ReactNode }) {
  const { setOpen } = useContext(MenuContext) as MenuContextType

  return (
    <div className={styles.menuItem} onClick={() => setOpen(false)}>
      {children}
    </div>
  )
}

export function SubMenu({ trigger, href, children }: Props) {
  const { setOpen } = useContext(MenuContext) as MenuContextType
  const [openSub, setOpenSub] = useState(false)

  function onClick() {
    setOpenSub(!openSub)
  }

  return (
    <div>
      <div onClick={onClick} className={styles.subTrigger}>
        <Link href={href || '#'} onClick={() => setOpen(false)}>
          {trigger}
        </Link>

        <IconButton variant="text">
          <Icon name="arrowDropDown" />
        </IconButton>
      </div>

      {openSub && <div className={styles.menuSubItems}>{children}</div>}
    </div>
  )
}
