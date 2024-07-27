'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/store'
import { Menu, MenuItem } from '@/ui'

export function AccountMenu() {
  const { t } = useTranslation()
  const category = usePathname().split('/')[2]

  const menu = [
    { title: t('profile'), path: undefined },
    { title: t('orders'), path: 'orders' },
    { title: t('reviews'), path: 'reviews' },
  ]

  return (
    <Menu>
      {menu.map(({ title, path }) => (
        <MenuItem key={title} variant="sidebar" active={category === path}>
          <Link href={`/account/${path || ''}`}>{title}</Link>
        </MenuItem>
      ))}
    </Menu>
  )
}
