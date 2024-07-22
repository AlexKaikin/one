'use client'

import { useFavoriteProducts } from '@/store'
import { Page, PageContent } from '@/ui'
import { Products } from '../_elements'

export default function FavoritesPage() {
  const { favoritesItems } = useFavoriteProducts()

  return (
    <Page>
      <PageContent>
        <Products products={favoritesItems} totalCount={'0'} />
      </PageContent>
    </Page>
  )
}
