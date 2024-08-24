import { getServerSession } from 'next-auth'
import { authOptions } from '@/configs'
import { PROFILE_TYPES } from '@/constants'
import { Profile } from '@/types'
import { ProfileSettings } from './_elements/ProfileSettings/ProfileSettings'

export default async function GroupsPage() {
  const session = await getServerSession(authOptions)
  const defaultValues = {
    companyName: '',
    type: PROFILE_TYPES.GROUP,
    avatarUrl: '',
    following: [],
    followers: [],
    about: '',
    interests: '',
    location: '',
    user: session?.user,
  } as unknown as Profile

  return <ProfileSettings defaultValues={defaultValues} />
}
