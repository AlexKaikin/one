'use client'

import { usePathname } from 'next/navigation'
import { Page, PageContent, Skeleton, Stack } from '@/ui'
import styles from './page.module.css'

export default function Loading() {
  const pathname = usePathname()
  const isProductPage = pathname.includes('product')
  const isComparePage = pathname.includes('compare')
  const isCartPage = pathname.includes('cart')

  const elements = Array(10)
    .fill(null)
    .map((_, index) => index)

  if (isProductPage || isComparePage || isCartPage) {
    return null
  }

  return (
    <Page>
      <PageContent>
        <div className={styles.products}>
          {elements.map(element => (
            <Stack key={element} flexDirection="column" spacing={1}>
              <Skeleton height="300px" width="100%" />

              <Stack flexDirection="row" justifyContent="space-between">
                <Skeleton height={2} width="60%" />
                <Skeleton height={2} width={6} />
              </Stack>
            </Stack>
          ))}
        </div>
      </PageContent>
    </Page>
  )
}
