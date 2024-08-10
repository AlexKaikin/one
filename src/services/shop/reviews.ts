import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { Review, CreateReview, UrlParams } from '@/types'

export const ReviewService = {
  create(data: CreateReview) {
    return api.post<Review>(ROUTES.REVIEWS, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Review[]>(`${ROUTES.REVIEWS}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Review>(`${ROUTES.REVIEWS}/${id}${getSearchParams(params)}`)
  },
  update(id: string, data: Review) {
    return api.patch<Review>(`${ROUTES.REVIEWS}/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Review>(`${ROUTES.REVIEWS}/${id}`)
  },
}
