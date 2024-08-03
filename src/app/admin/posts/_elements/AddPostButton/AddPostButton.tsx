'use client'

import Link from 'next/link'
import { useTranslation } from '@/store'
import { Button } from '@/ui'

export function AddPostButton() {
  const { t } = useTranslation()

  return (
    <Link href={'/admin/posts/new'}>
      <Button>{t('add')}</Button>
    </Link>
  )
}
