import { User as UserType } from '@/types'

export function User({ user }: { user: UserType }) {
  return <div>{user.firstName}</div>
}
