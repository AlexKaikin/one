import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { UrlParams } from '@/types'
import { User } from '../_elements'

async function getUser(id: string, urlParams: UrlParams) {
  try {
    const { data } = await UserService.getOne(id, urlParams)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function UserPage(urlParams: UrlParams) {
  const user = await getUser(urlParams.params!.user!, urlParams)

  if (!user) return null

  return <User user={user} />
}
