import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { Comment, CreateComment, UrlParams } from '@/types'

export const CommentService = {
  create(data: CreateComment) {
    return api.post<Comment>(ROUTES.COMMENTS, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Comment[]>(`${ROUTES.COMMENTS}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Comment>(
      `${ROUTES.COMMENTS}/${id}${getSearchParams(params)}`
    )
  },
  update(id: string, data: Comment) {
    return api.patch<Comment>(`${ROUTES.COMMENTS}/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Comment>(`${ROUTES.COMMENTS}/${id}`)
  },
}
