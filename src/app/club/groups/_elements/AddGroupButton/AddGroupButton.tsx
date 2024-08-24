'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from '@/store'
import { Button, Icon } from '@/ui'

export function AddGroupButton() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <Button
      startIcon={<Icon name="plus" width={16} height={16} />}
      onClick={() => router.push('/club/groups/new')}
    >
      {t('add')}
    </Button>
  )
}
