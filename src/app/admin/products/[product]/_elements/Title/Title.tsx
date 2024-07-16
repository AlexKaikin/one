'use client'

import { useTranslation } from '@/store'

export function Title() {
  const { t } = useTranslation()

  return <>{t('updateProduct')}</>
}
