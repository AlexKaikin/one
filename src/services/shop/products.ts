import { api, options } from '@/configs/api'
import { getSearchParams } from '@/helpers'
import { Product, UrlParams } from '@/types'

export const ProductService = {
  create(data: Product) {
    return api.post<Product>(`products`, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Product[]>(`products/${getSearchParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Product>(`products/${id}`)
  },
  update(id: string, data: Product) {
    return api.patch<Product>(`products/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<Product>(`products/${id}`)
  },
}
