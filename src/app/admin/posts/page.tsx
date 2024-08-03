import { ApiError } from '@/helpers';
import { PostService, ProductService } from '@/services';
import { UrlParams } from '@/types';
import { Page, PageContent, PageHeader, Pagination } from '@/ui';
import { AddPostButton, Posts } from './_elements';


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

export default async function ProductsPage(urlParams: UrlParams) {
  urlParams.searchParams.published = 'true'
  const data = await getPosts(urlParams)

  if (!data) {
    return null
  }

  const { posts, totalCount } = data

  return (
    <Page>
      <PageHeader>
        <AddPostButton />
      </PageHeader>
      <PageContent>
        <Posts posts={posts} />
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}