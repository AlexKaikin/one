import { api, options } from '@/configs/api'
import { getSearchParams } from '@/helpers'
import { Post, UrlParams } from '@/types'

export const PostService = {
  create(data: Post) {
    return api.post<Post>(`posts`, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Post[]>(`posts/${getSearchParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Post>(`posts/${id}`)
  },
  update(id: string, data: Post) {
    return api.patch<Post>(`posts/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<Post>(`posts/${id}`)
  },
}
