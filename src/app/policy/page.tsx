'use client'

import { useTranslation } from '@/store'
import { Page, PageContent, PageHeader } from '@/ui'

export default function PolicyPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <PageHeader>{t('policyTitle')}</PageHeader>
      <PageContent>
        <div dangerouslySetInnerHTML={{ __html: t('policyContent') }} />
      </PageContent>
    </Page>
  )
}
