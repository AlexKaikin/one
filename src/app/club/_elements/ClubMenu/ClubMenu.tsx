'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/store'
import { Icon, IconType, Menu, MenuItem } from '@/ui'

export function ClubMenu() {
  const { t } = useTranslation()
  const category = usePathname().split('/')[2]

  const menu = [
    { title: t('myPage'), path: undefined, icon: 'user' },
    { title: t('messenger'), path: 'messenger', icon: 'message' },
    { title: t('groups'), path: 'groups', icon: 'flag' },
    { title: t('users'), path: 'users', icon: 'users' },
    { title: t('events'), path: 'events', icon: 'megaphone' },
  ]

  return (
    <Menu>
      {menu.map(({ title, path, icon }) => (
        <MenuItem key={title} variant="sidebar" active={category === path}>
          <Icon name={icon as IconType} width={18} height={18} />{' '}
          <Link href={`/club/${path || ''}`}>{title}</Link>
        </MenuItem>
      ))}
    </Menu>
  )
}
