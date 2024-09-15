'use client'

import { usePathname } from 'next/navigation'
import { Page, PageContent, Skeleton, Stack } from '@/ui'
import styles from './page.module.css'

export default function Loading() {
  const pathname = usePathname()
  const isPostPage = pathname.includes('post')

  const elements = Array(8)
    .fill(null)
    .map((_, index) => index)

  if (isPostPage) {
    return null
  }

  return (
    <Page>
      <PageContent>
        <div className={styles.posts}>
          {elements.map(element => (
            <Stack key={element} flexDirection="column" spacing={2}>
              <Skeleton height="175px" width="100%" />

              <Skeleton height={2} width="90%" />

              <Stack flexDirection="row" spacing={2}>
                <Skeleton height={2} width="100px" />
                <Skeleton height={2} width="100px" />
                <Skeleton height={2} width="30px" />
              </Stack>

              <Stack flexDirection="column" spacing={1}>
                <Skeleton height={2} width="90%" />
                <Skeleton height={2} width="95%" />
                <Skeleton height={2} width="92%" />
              </Stack>
            </Stack>
          ))}
        </div>
      </PageContent>
    </Page>
  )
}
