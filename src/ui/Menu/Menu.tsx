'use client'

import {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
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
  active?: boolean
}
type Props = { trigger: ReactNode; href?: string; children: ReactNode }

export function Menu(props: MenuProps) {
  return (
    <MenuProvider>
      <MenuWithContext {...props} />
    </MenuProvider>
  )
}

export function MenuWithContext({
  trigger,
  href,
  active,
  children,
}: MenuProps) {
  const { open, style, setStyle, handleCloseMenu, handleToggleMenu } =
    useContext(MenuContext) as MenuContextType
  const { height, width } = useWindowDimensions()
  const ref = useRef<any | null>(null)
  const portalRef = useRef<any | null>(null)
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  useOnClickOutside(ref, handleCloseMenu)

  useEffect(() => {
    handleCloseMenu()
  }, [handleCloseMenu, search])

  useLayoutEffect(() => {
    if (open && portalRef.current && height && width) {
      const portalRect = portalRef.current.getBoundingClientRect()

      if (portalRect.right > width) {
        setStyle(prev => ({ ...prev, right: `10px` }))
      }

      if (portalRect.bottom > height) {
        setStyle(prev => ({ ...prev, bottom: `50px` }))
      }

      if (portalRect.left < 0) {
        setStyle(prev => ({ ...prev, left: `10px` }))
      }

      if (portalRect.top < 0) {
        setStyle(prev => ({ ...prev, top: `10px` }))
      }
    }
  }, [height, width, open, setStyle])

  return (
    <div ref={ref} className={styles.menu}>
      <div className={styles.trigger}>
        {href ? (
          <Link
            href={href || '#'}
            onClick={handleCloseMenu}
            className={cn({ [styles.activeLink]: active })}
          >
            {trigger}
          </Link>
        ) : (
          <div className={styles.triggerButton} onClick={handleToggleMenu}>
            {trigger}
          </div>
        )}

        {!!href && (
          <IconButton variant="clean" onClick={handleToggleMenu}>
            <Icon
              name="arrowDropDown"
              width={16}
              height={16}
              className={styles.icon}
            />
          </IconButton>
        )}
      </div>

      {!trigger && <div>{children}</div>}

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

type MenuItemProps = {
  children: ReactNode
  active?: boolean
  variant?: 'sidebar'
}

export function MenuItem({ children, active = false, variant }: MenuItemProps) {
  const { handleCloseMenu } = useContext(MenuContext) as MenuContextType

  return (
    <div
      className={cn(styles.menuItem, {
        [styles['active']]: active,
        [styles[variant || '']]: !!variant,
      })}
      onClick={handleCloseMenu}
    >
      {children}
    </div>
  )
}

export function SubMenu({ trigger, href, children }: Props) {
  const { handleCloseMenu } = useContext(MenuContext) as MenuContextType
  const [openSub, setOpenSub] = useState(false)

  function onClick() {
    setOpenSub(!openSub)
  }

  return (
    <div>
      <div onClick={onClick} className={styles.subTrigger}>
        <Link href={href || '#'} onClick={handleCloseMenu}>
          {trigger}
        </Link>

        <IconButton variant="clean">
          <Icon
            name="arrowDropDown"
            width={16}
            height={16}
            className={cn(styles.icon, { [styles['open']]: openSub })}
          />
        </IconButton>
      </div>

      {openSub && <div className={styles.menuSubItems}>{children}</div>}
    </div>
  )
}
