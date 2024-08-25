import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { ApiError } from '@/helpers'
import { NoteService, ProfileService } from '@/services'
import { UrlParams } from '@/types'
import { Profile } from './_elements'

async function getProfile(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'user' } } as UrlParams
    const { data } = await ProfileService.getOne(id, urlParams)

    return data
  } catch (error) {
    ApiError(error)
  }
}

async function getNotes(profile: string) {
  try {
    const response = await NoteService.getAll({
      searchParams: { profile, populate: 'user' },
    })

    const notes = response.data
    const totalCount = response.headers['x-total-count']

    return { notes, totalCount }
  } catch (error) {
    ApiError(error)
  }
}

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions)

  const profileData = await getProfile(session!.user.profile)
  const notesData = await getNotes(session!.user.profile)
  const [profile, notesResponse] = await Promise.all([profileData, notesData])

  if (!profile || !notesResponse) {
    return null
  }

  return (
    <Profile
      profile={profile}
      noteValues={notesResponse}
    />
  )
}
