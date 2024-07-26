import { User } from '@/app/api/users/model'
import { api, options } from '@/configs/api'
import { getSearchParams } from '@/helpers'
import { UserRegistration, UrlParams, UserResponse } from '@/types'

export const UserService = {
  create(data: UserRegistration) {
    return api.post<UserResponse>(`/users`, data)
  },
  getAll(params: UrlParams) {
    return api.get<User[]>(`users/?${getSearchParams(params)}`)
  },
  getOne(id: string) {
    return api.get<User>(`users/${id}`)
  },
  update(id: string, data: User) {
    return api.patch<User>(`users/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<User>(`users/${id}`)
  },
}
