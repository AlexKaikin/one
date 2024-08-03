import { api, options } from '@/configs/api'
import { getSearchParams } from '@/helpers'
import { CreateComment, UrlParams } from '@/types'

export const CommentService = {
  create(data: CreateComment) {
    return api.post<Comment>(`comments`, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Comment[]>(`comments/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Comment>(`comments/${id}${getSearchParams(params)}`)
  },
  update(id: string, data: Comment) {
    return api.patch<Comment>(`comments/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Comment>(`comments/${id}`)
  },
}
