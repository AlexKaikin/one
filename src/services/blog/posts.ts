import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { Post, UrlParams } from '@/types'

export const PostService = {
  create(data: Post) {
    return api.post<Post>(ROUTES.POSTS, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Post[]>(`${ROUTES.POSTS}/${getSearchParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Post>(`${ROUTES.POSTS}/${id}`)
  },
  update(id: string, data: Post) {
    return api.patch<Post>(`${ROUTES.POSTS}/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<Post>(`${ROUTES.POSTS}/${id}`)
  },
}
