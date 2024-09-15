import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { UrlParams, CreateMessage, Message } from '@/types'

export const MessageService = {
  create(data: CreateMessage) {
    return api.post<Message>(ROUTES.MESSAGES, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Message[]>(`${ROUTES.MESSAGES}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Message>(`${ROUTES.MESSAGES}/${id}${getSearchParams(params)}`)
  },
  update(id: string, data: Message) {
    return api.patch<Message>(`${ROUTES.MESSAGES}/${id}`, data, options.multipart)
  },
  updateMany(data: Message[]) {
    return api.patch<Message[]>(`${ROUTES.MESSAGES}/`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Message>(`${ROUTES.MESSAGES}/${id}`)
  },
}
