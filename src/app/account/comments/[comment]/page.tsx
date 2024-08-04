import { Comment } from '@/app/_elements'
import { ApiError } from '@/helpers'
import { CommentService } from '@/services'
import { UrlParams } from '@/types'

async function getComment(id: string, urlParams: UrlParams) {
  try {
    const { data } = await CommentService.getOne(id, urlParams)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function CommentPage(urlParams: UrlParams) {
  urlParams.searchParams.populate = 'post user'
  const comment = await getComment(urlParams.params!.comment!, urlParams)

  if (!comment) return null

  return <Comment comment={comment} />
}
