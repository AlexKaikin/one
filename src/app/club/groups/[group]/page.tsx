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
  const profileData = await getUser(urlParams.params!.group!)
  const notesData = await getNotes(urlParams.params!.group!)
  const [profile, notesResponse] = await Promise.all([profileData, notesData])

  if (!profile || !notesResponse) {
    return null
  }

  return <Profile profile={profile} noteValues={notesResponse} />
}