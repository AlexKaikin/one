import { CreateOrder, Order } from '@/app/api/orders/model'
import { api, options } from '@/configs/api'
import { getSearchParams } from '@/helpers'
import { UrlParams } from '@/types'

export const OrderService = {
  create(data: CreateOrder) {
    return api.post<Order>(`orders`, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Order[]>(`orders/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Order>(`orders/${id}${getSearchParams(params)}`)
  },
  update(id: string, data: Order) {
    return api.patch<Order>(`orders/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Order>(`orders/${id}`)
  },
}
