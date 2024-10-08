import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { ProfileService } from '@/services'
import { UrlParams } from '@/types'
import { ProfileSettings } from './_elements/ProfileSettings/ProfileSettings'

async function getUserById(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'user' } } as UrlParams
    const { data } = await ProfileService.getOne(id, urlParams)

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)
  const data = await getUserById(session!.user.profile)

  if (!data) {
    return null
  }

  return <ProfileSettings defaultValues={data} />
}
