import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { UrlParams, CreateChat, Chat, Message } from '@/types'

export const ChatService = {
  create(data: CreateChat) {
    return api.post<Chat>(ROUTES.CHATS, data, options.json)
  },
  getAll(params: UrlParams) {
    return api.get<Chat[]>(`${ROUTES.CHATS}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<{ chat: Chat; messages: Message[] }>(
      `${ROUTES.CHATS}/${id}${getSearchParams(params)}`
    )
  },
  getOneByUserId(id: string) {
    return api.get<Chat>(`${ROUTES.CHATS}/user/${id}`)
  },
  update(id: string, data: Chat) {
    return api.patch<Chat>(`${ROUTES.CHATS}/${id}`, data, options.json)
  },
  delete(id: string) {
    return api.delete<Chat>(`${ROUTES.CHATS}/${id}`)
  },
}
