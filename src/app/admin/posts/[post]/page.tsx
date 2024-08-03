import { ApiError } from '@/helpers'
import { PostService, ProductService } from '@/services'
import { UrlParams } from '@/types'
import { Post } from './_elements'

async function getPost(id: string) {
  try {
    const { data } = await PostService.getOne(id)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ProductPage(urlParams: UrlParams) {
  const post = await getPost(urlParams.params!.post!)

  if (!post) {
    return null
  }

  return <Post defaultValues={post} />
}
