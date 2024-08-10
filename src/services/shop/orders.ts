import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { CreateOrder, Order } from '@/types'
import { UrlParams } from '@/types'

export const OrderService = {
  create(data: CreateOrder) {
    return api.post<Order>(ROUTES.ORDERS, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Order[]>(`${ROUTES.ORDERS}/${getSearchParams(params)}`)
  },
  getOne(id: string) {
    return api.get<Order>(`${ROUTES.ORDERS}/${id}`)
  },
  update(id: string, data: Order) {
    return api.patch<Order>(`${ROUTES.ORDERS}/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Order>(`${ROUTES.ORDERS}/${id}`)
  },
}
