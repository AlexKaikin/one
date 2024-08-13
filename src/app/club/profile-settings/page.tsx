import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { UrlParams } from '@/types'
import { ProfileSettings } from '../_elements'

async function getUserById(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'profile' } } as UrlParams
    const { data } = await UserService.getOne(id, urlParams)

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)
  const data = await getUserById(session!.user.id)

  if (!data) {
    return null
  }

  return <ProfileSettings defaultValues={data} />
}
