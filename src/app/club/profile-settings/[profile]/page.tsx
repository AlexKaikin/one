import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { ProfileService } from '@/services'
import { UrlParams } from '@/types'
import { ProfileSettings } from './_elements/ProfileSettings/ProfileSettings'

async function getProfile(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'user' } } as UrlParams
    const { data } = await ProfileService.getOne(id, urlParams)

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function ProfileSettingsPage(urlParams: UrlParams) {
  const session = await getServerSession(authOptions)

  if (session?.user.profile === urlParams.params!.profile!) {
    redirect('/club/profile-settings')
  }

  const profile = await getProfile(urlParams.params!.profile!)

  if (!profile) return null

  return <ProfileSettings defaultValues={profile} />
}
