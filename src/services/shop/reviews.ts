import { Review, CreateReview } from '@/app/api/reviews/model'
import { api, options } from '@/config/api'
import { getSearchParams } from '@/helpers'
import { UrlParams } from '@/types'

export const ReviewService = {
  create(data: CreateReview) {
    return api.post<Review>(`reviews`, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Review[]>(`reviews/?${getSearchParams(params)}`)
  },
  getAllbyProduct(product_Id: string) {
    return api.get<Review[]>(`reviews/product/${product_Id}`)
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
