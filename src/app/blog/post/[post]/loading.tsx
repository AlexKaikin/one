import { Page, PageContent, Skeleton, Stack } from '@/ui'
import styles from './_elements/Post/Post.module.css'

export default function Loading() {
  return (
    <Page>
      <PageContent>
        <div className={styles.container}>
          <div className={styles.content}>
            <Stack flexDirection="column" spacing={2}>
              <Skeleton height={2} width="90%" />

              <Stack flexDirection="row" spacing={2}>
                <Skeleton height={2} width="100px" />
                <Skeleton height={2} width="100px" />
                <Skeleton height={2} width="30px" />
              </Stack>

              <Skeleton height="175px" width="100%" />

              <Stack flexDirection="column" spacing={1}>
                <Skeleton height={2} width="90%" />
                <Skeleton height={2} width="95%" />
                <Skeleton height={2} width="92%" />
              </Stack>

              <Stack flexDirection="column" spacing={1}>
                <Skeleton height={2} width="92%" />
                <Skeleton height={2} width="95%" />
              </Stack>
            </Stack>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
