'use client'

import { useFavoriteProducts } from '@/store'
import { Button, Page, PageContent, Stack, Typography } from '@/ui'
import { Products } from '../_elements'
import styles from './page.module.css'

export default function FavoritesPage() {
  const { favoritesItems } = useFavoriteProducts()

  if (!favoritesItems.length)
    return (
      <Page>
        <PageContent>
          <div className={styles.empty}>
            <Stack flexDirection="column" spacing={2} alignItems="center">
              <Typography variant="h2">No favorites products</Typography>
              <Typography variant="p" align="center">
                It looks like you haven&rsquo;t added anything to your favorites yet.
              </Typography>
              <Button href="/shop">Go shop</Button>
            </Stack>
          </div>
        </PageContent>
      </Page>
    )

  return (
    <Page>
      <PageContent>
        <Products products={favoritesItems} totalCount={'0'} />
      </PageContent>
    </Page>
  )
}
