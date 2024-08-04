import { Comments } from '@/app/_elements'
import { ApiError } from '@/helpers'
import { CommentService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent, Pagination } from '@/ui'

async function getComments(urlParams: UrlParams) {
  try {
    const response = await CommentService.getAll(urlParams)
    const comments = response.data
    const totalCount = response.headers['x-total-count']

    return { comments, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function CommentsPage(urlParams: UrlParams) {
  const data = await getComments(urlParams)

  if (!data) return null

  const { comments, totalCount } = data

  return (
    <Page>
      <PageContent>
        <Comments comments={comments} />
        <Pagination totalCount={totalCount} />
      </PageContent>
    </Page>
  )
}
