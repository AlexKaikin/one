import { PROFILE_TYPES, ROLES, USER_STATUSES } from '@/constants'

export type User = {
  id: string
  lastName: string
  firstName: string
  email: string
  password: string
  role: ROLES
  status: USER_STATUSES
  profile: Profile
  createdAt: string
  updatedAt: string
}

export type UserRegistration = {
  email: string
  password: string
}

export type UserResponse =
  | {
      email: string
      password: string
    }
  | { message: string }

export type Profile = {
  id: string
  companyName: string
  type: PROFILE_TYPES
  avatarUrl: string
  following: User[]
  followers: User[]
  about: string
  interests: string
  location: string
  user: User
  createdAt: string
  updatedAt: string
}

export type ProfileRegistration = Omit<
  Profile,
  'id' | 'createdAt' | 'updatedAt'
>
