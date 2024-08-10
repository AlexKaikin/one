import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { UserRegistration, UrlParams, UserResponse, User } from '@/types'

export const UserService = {
  create(data: UserRegistration) {
    return api.post<UserResponse>(ROUTES.USERS, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<User[]>(`${ROUTES.USERS}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<User>(`${ROUTES.USERS}/${id}${getSearchParams(params)}`)
  },
  update(id: string, data: User) {
    return api.patch<User>(`${ROUTES.USERS}/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<User>(`${ROUTES.USERS}/${id}`)
  },
}
