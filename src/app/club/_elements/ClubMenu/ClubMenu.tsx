'use client'

import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SCREEN_SIZES } from '@/constants'
import { useWindowDimensions } from '@/hooks'
import { useTranslation } from '@/store'
import { Aside, Icon, IconType, List, Menu, MenuItem } from '@/ui'
import styles from './ClubMenu.module.css'

export function ClubMenu() {
  const { t } = useTranslation()
  const category = usePathname().split('/')[2]
  const { width } = useWindowDimensions()

  const menu = [
    { title: t('myPage'), path: undefined, icon: 'user' },
    { title: t('messenger'), path: 'messenger', icon: 'message' },
    { title: t('groups'), path: 'groups', icon: 'flag' },
    { title: t('users'), path: 'users', icon: 'users' },
    { title: t('events'), path: 'events', icon: 'megaphone' },
  ]

  if (width && width < SCREEN_SIZES.MD) {
    return (
      <>
        {createPortal(
          <div className={styles.menu}>
            {menu.map(({ title, path, icon }) => (
              <div key={title} className={styles.link}>
                <Icon name={icon as IconType} width={18} height={18} />{' '}
                <Link href={`/club/${path || ''}`}>{title}</Link>
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
        {menu.map(({ title, path, icon }) => (
          <MenuItem key={title} variant="sidebar" active={category === path}>
            <Icon name={icon as IconType} width={18} height={18} />{' '}
            <Link href={`/club/${path || ''}`}>{title}</Link>
          </MenuItem>
        ))}
      </Menu>
    </Aside>
  )
}
