import { ApiError } from '@/helpers'
import { PostService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent } from '@/ui'
import { Posts } from '../../_elements'

async function getPosts(urlParams: UrlParams) {
  try {
    const response = await PostService.getAll(urlParams)
    const posts = response.data
    const totalCount = response.headers['x-total-count']

    return { posts, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function CategoryPage(urlParams: UrlParams) {
  const category = urlParams.params?.category
  if (category) urlParams.searchParams.category = category

  const data = await getPosts(urlParams)

  if (!data) {
    return null
  }

  const { posts, totalCount } = data

  return (
    <Page>
      <PageContent>
        <Posts posts={posts} totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
