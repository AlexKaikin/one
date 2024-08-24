import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { UrlParams, Profile, ProfileRegistration } from '@/types'

export const ProfileService = {
  create(data: ProfileRegistration) {
    return api.post<Profile>(ROUTES.PROFILES, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Profile[]>(`${ROUTES.PROFILES}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Profile>(
      `${ROUTES.PROFILES}/${id}${getSearchParams(params)}`
    )
  },
  update(id: string, data: Profile) {
    return api.patch<Profile>(
      `${ROUTES.PROFILES}/${id}`,
      data,
      options.multipart
    )
  },
  delete(id: string) {
    return api.delete<Profile>(`${ROUTES.PROFILES}/${id}`)
  },
}
