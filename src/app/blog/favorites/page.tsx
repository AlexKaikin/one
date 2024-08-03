'use client'

import { useFavoritePosts } from '@/store'
import { Page, PageContent } from '@/ui'
import { Posts } from '../_elements'

export default function FavoritesPage() {
  const { favoritesItems } = useFavoritePosts()

  return (
    <Page>
      <PageContent>
        <Posts posts={favoritesItems} totalCount={'0'} />
      </PageContent>
    </Page>
  )
}
