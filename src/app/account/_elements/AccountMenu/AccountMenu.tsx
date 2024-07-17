'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/store'
import { Menu, MenuItem } from '@/ui'

export function AccountMenu() {
  const { t } = useTranslation()
  const category = usePathname()

  const menu = [{ title: t('profile'), path: '/account' }]

  return (
    <Menu>
      {menu.map(({ title, path }) => (
        <MenuItem key={title} variant="sidebar" active={category === path}>
          <Link href={path}>{title}</Link>
        </MenuItem>
      ))}
    </Menu>
  )
}
