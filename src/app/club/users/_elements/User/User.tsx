import { User as UserType } from '@/types'
import { Profile } from '@/app/club/_elements'

export function User({ user }: { user: UserType }) {

  return (
    <Profile user={user}/>
  )
}
