'use client'

import { useTranslation } from '@/store'
import { Page, PageContent } from '@/ui'
import styles from './page.module.css'

export default function PolicyPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <PageContent>
        <div className={styles.wrapper}>
          <div className={styles.content}>{t('policyTitle')}</div>
          <div
            dangerouslySetInnerHTML={{ __html: t('policyContent') }}
            className={styles.content}
          />
        </div>
      </PageContent>
    </Page>
  )
}
