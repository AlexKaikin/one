'use client'

import Link from 'next/link'
import { useTranslation } from '@/store'
import { List } from '@/ui'

export function AdminMenu() {
  const { t } = useTranslation()

  return (
    <List>
      <Link href={'/admin'}>{t('dashboard')}</Link>
      <Link href={'/admin/products'}>{t('products')}</Link>
    </List>
  )
}
