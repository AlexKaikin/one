import { api, options } from '@/configs/api'
import { getSearchParams } from '@/helpers'
import { Review, CreateReview, UrlParams } from '@/types'

export const ReviewService = {
  create(data: CreateReview) {
    return api.post<Review>(`reviews`, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Review[]>(`reviews/?${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Review>(`reviews/${id}?${getSearchParams(params)}`)
  },
  update(id: string, data: Review) {
    return api.patch<Review>(`reviews/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Review>(`reviews/${id}`)
  },
}
