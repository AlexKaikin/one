import { ROLES, USER_STATUSES } from '@/constants';


export type User = {
  id: string
  lastName: string
  firstName: string
  avatarUrl: string
  email: string
  password: string
  role: ROLES
  status: USER_STATUSES
  following: User[]
  followers: User[]
  about: string
  interests: string[]
  location: string
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