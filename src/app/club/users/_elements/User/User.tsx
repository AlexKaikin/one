import { Profile } from '@/app/club/_elements'
import { Profile as ProfileType } from '@/types'

export function User({ user }: { user: ProfileType }) {
  return <Profile profile={user} />
}
