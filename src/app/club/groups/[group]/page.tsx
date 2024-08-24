import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { ProfileService } from '@/services'
import { UrlParams } from '@/types'
import { User } from '../../users/_elements'

async function getUser(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'user' } } as UrlParams
    const { data } = await ProfileService.getOne(id, urlParams)

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function UserPage(urlParams: UrlParams) {
  const session = await getServerSession(authOptions)

  if (session?.user.profile === urlParams.params!.group!) {
    redirect('/club')
  }

  const profile = await getUser(urlParams.params!.group!)

  if (!profile) return null

  return <User user={profile} />
}
