import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { UserService } from '@/services'
import { UrlParams } from '@/types'
import { User } from '../_elements'

async function getUser(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'profile' } } as UrlParams
    const { data } = await UserService.getOne(id, urlParams)
    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function UserPage(urlParams: UrlParams) {
  const session = await getServerSession(authOptions)

  if (session?.user.id === urlParams.params!.user!) {
    redirect('/club')
  }

  const user = await getUser(urlParams.params!.user!)

  if (!user) return null

  return <User user={user} />
}
