import { api, options } from '@/configs/api'
import { ROUTES } from '@/constants'
import { getSearchParams } from '@/helpers'
import { UrlParams, CreateNote, Note } from '@/types'

export const NoteService = {
  create(data: CreateNote) {
    return api.post<Note>(ROUTES.NOTES, data, options.multipart)
  },
  getAll(params: UrlParams) {
    return api.get<Note[]>(`${ROUTES.NOTES}/${getSearchParams(params)}`)
  },
  getOne(id: string, params: UrlParams) {
    return api.get<Note>(`${ROUTES.NOTES}/${id}${getSearchParams(params)}`)
  },
  update(id: string, data: Note) {
    return api.patch<Note>(`${ROUTES.NOTES}/${id}`, data, options.multipart)
  },
  delete(id: string) {
    return api.delete<Note>(`${ROUTES.NOTES}/${id}`)
  },
}
