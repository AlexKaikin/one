'use client'

import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SCREEN_SIZES } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { useTranslation } from '@/store'
import { Aside, Icon, IconType, Menu, MenuItem } from '@/ui'
import styles from './AccountMenu.module.css'

export function AccountMenu() {
  const { t } = useTranslation()
  const category = usePathname().split('/')[2]
  const { width } = useWindowDimensions()

  const menu = [
    { title: t('profile'), path: undefined, icon: 'user' },
    { title: t('orders'), path: 'orders', icon: 'cart' },
    { title: t('reviews'), path: 'reviews', icon: 'starOutline' },
    { title: t('comments'), path: 'comments', icon: 'message' },
  ]

  if (width && width < SCREEN_SIZES.MD) {
    return (
      <>
        {createPortal(
          <div className={styles.menu}>
            {menu.map(({ title, path, icon }) => (
              <div key={title} className={styles.link}>
                <Icon name={icon as IconType} width={18} height={18} />{' '}
                <Link href={`/account/${path || ''}`}>{title}</Link>
              </div>
            ))}
          </div>,
          document.body
        )}
      </>
    )
  }

  return (
    <Aside>
      <Menu>
        {menu.map(({ title, path }) => (
          <MenuItem key={title} variant="sidebar" active={category === path}>
            <Link href={`/account/${path || ''}`}>{title}</Link>
          </MenuItem>
        ))}
      </Menu>
    </Aside>
  )
}
