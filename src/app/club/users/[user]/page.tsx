import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/configs';
import { ApiError } from '@/helpers';
import { NoteService, ProfileService } from '@/services';
import { UrlParams } from '@/types';
import { Profile } from '../../_elements';


async function getUser(id: string) {
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

export default async function UserPage(urlParams: UrlParams) {
  const session = await getServerSession(authOptions)

  if (session?.user.profile === urlParams.params!.user!) {
    redirect('/club')
  }

  const profileData = await getUser(urlParams.params!.user!)
  const notesData = await getNotes(urlParams.params!.user!)
  const [profile, notesResponse] = await Promise.all([profileData, notesData])

  if (!profile || !notesResponse) {
    return null
  }

  return <Profile profile={profile} noteValues={notesResponse} />
}