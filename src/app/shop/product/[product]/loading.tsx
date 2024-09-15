import { Page, PageContent, Skeleton, Stack } from '@/ui'
import styles from './_elements/Product/Product.module.css'

export default function Loading() {
  return (
    <Page>
      <PageContent>
        <div className={styles.product}>
          <Stack isWide flexDirection='row' spacing={1}>
            <Stack flexDirection="column" spacing={2}>
              <Skeleton height={6} width={6} />
              <Skeleton height={6} width={6} />
              <Skeleton height={6} width={6} />
              <Skeleton height={6} width={6} />
            </Stack>

            <Skeleton height="400px" width="100%" />
          </Stack>

          <Stack isWide flexDirection="column" spacing={2}>
            <Skeleton height={2} width={10} />
            <Skeleton height={4} width="95%" />

            <Stack flexDirection="row" spacing={1}>
              <Skeleton height={2} width={2} />
              <Skeleton height={2} width={2} />
              <Skeleton height={2} width={2} />
              <Skeleton height={2} width={2} />
              <Skeleton height={2} width={2} />
            </Stack>

            <Skeleton height={2} width={8} />

            <Stack flexDirection="row" spacing={1}>
              <Skeleton height={4} width={4} />
              <Skeleton height={4} width={4} />
              <Skeleton height={4} width={8} />
            </Stack>

            <Stack flexDirection="column" spacing={2}>
              <Skeleton height={4} width="150px" />

              <Stack flexDirection="column" spacing={1}>
                <Skeleton height={2} width="90%" />
                <Skeleton height={2} width="95%" />
                <Skeleton height={2} width="93%" />
              </Stack>

              <Stack flexDirection="column" spacing={1}>
                <Skeleton height={2} width="90%" />
                <Skeleton height={2} width="95%" />
                <Skeleton height={2} width="93%" />
              </Stack>
            </Stack>
          </Stack>
        </div>
      </PageContent>
    </Page>
  )
}
