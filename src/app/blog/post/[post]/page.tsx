import { ApiError } from '@/helpers'
import { PostService, CommentService } from '@/services'
import { UrlParams } from '@/types'
import { Page, PageContent } from '@/ui'
import { Post } from './_elements'

async function getPost(id: string) {
  try {
    const { data } = await PostService.getOne(id)
    return data
  } catch (error) {
    ApiError(error)
  }
}

async function getComments(postId: string) {
  try {
    const { data } = await CommentService.getAll({
      searchParams: { post: postId, populate: 'user' },
    })

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function PostPage(urlParams: UrlParams) {
  const postData = await getPost(urlParams.params!.post!)
  const commentsData = await getComments(urlParams.params!.post!)
  const [post, comments] = await Promise.all([postData, commentsData])

  if (!post || !comments) {
    return null
  }

  return (
    <Page>
      <PageContent>
        <Post post={post} comments={comments} />
      </PageContent>
    </Page>
  )
}
