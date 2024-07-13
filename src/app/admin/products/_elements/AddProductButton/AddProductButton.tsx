'use client'

import Link from 'next/link'
import { useTranslation } from '@/store'
import { Button } from '@/ui'

export function AddProductButton() {
  const { t } = useTranslation()

  return (
    <Link href={'/admin/products/new'}>
      <Button>{t('add')}</Button>
    </Link>
  )
}
