import { getServerSession } from 'next-auth';
import { authOptions } from '@/configs';
import { ApiError } from '@/helpers';
import { ProfileService } from '@/services';
import { UrlParams } from '@/types';
import { Profile } from './_elements';


async function getProfileById(id: string) {
  try {
    const urlParams = { searchParams: { populate: 'user' } } as UrlParams
    const { data } = await ProfileService.getOne(id, urlParams)

    return data
  } catch (error) {
    ApiError(error)
  }
}

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions)
   
  const data = await getProfileById(session!.user.profile)

  if (!data) {
    return null
  }

  return <Profile profile={data} />
}