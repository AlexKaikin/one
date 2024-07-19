'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/store'
import { Menu, MenuItem } from '@/ui'

export function AdminMenu() {
  const { t } = useTranslation()
  const category = usePathname().split('/')[2]
  
  const menu = [
    { title: t('dashboard'), path: undefined },
    { title: t('products'), path: 'products' },
  ]

  return (
    <Menu>
      {menu.map(({ title, path }) => (
        <MenuItem key={title} variant="sidebar" active={category === path}>
          <Link href={`/admin/${path || ''}`}>{title}</Link>
        </MenuItem>
      ))}
    </Menu>
  )
}
