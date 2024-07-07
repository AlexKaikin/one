import { UrlParams } from '@/types'

export function getSearchParams({ searchParams }: UrlParams) {
  let params = '?'
  let key: keyof typeof searchParams

  for (key in searchParams) {
    params += `&${key}=${searchParams[key]}`
  }

  return params
}
