'use client'

import { useTranslation } from '@/store'
import { Page, PageContent, PageHeader } from '@/ui'

export default function CookiePage() {
  const { t } = useTranslation()

  return (
    <Page>
      <PageHeader>{t('cookieTitle')}</PageHeader>
      <PageContent>
        <div dangerouslySetInnerHTML={{ __html: t('cookieContent') }} />
      </PageContent>
    </Page>
  )
}
