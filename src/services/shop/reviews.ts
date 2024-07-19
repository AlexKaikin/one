import { Review, CreateReview } from '@/app/api/reviews/model'
import { api, options } from '@/config/api';


export const ReviewService = {
  create(data: CreateReview) {
    return api.post<Review>(`reviews`, data, options.json)
  },
  getAll() {
    return api.get<Review[]>(`reviews/`)
  },
  getAllbyProduct(product_Id: string) {
    return api.get<Review[]>(`reviews/product/${product_Id}`)
  },
  getOne(id: string) {
    return api.get<Review>(`reviews/${id}`)
  },
  update(id: string, data: Review) {
    return api.patch<Review>(`reviews/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Review>(`reviews/${id}`)
  },
}