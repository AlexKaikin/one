import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { Product, UrlParams } from '@/types'

export const ProductService = {
  create(data: Product) {
    return api.post<Product>(ROUTES.PRODUCTS, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Product[]>(`${ROUTES.PRODUCTS}/${getSearchParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Product>(`${ROUTES.PRODUCTS}/${id}`)
  },
  update(id: string, data: Product) {
    return api.patch<Product>(
      `${ROUTES.PRODUCTS}/${id}`,
      data,
      options.multipart
    )
  },
  delete(id: string) {
    return api.delete<Product>(`${ROUTES.PRODUCTS}/${id}`)
  },
}
