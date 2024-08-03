import { Roles, UserStatuses } from '@/entities'

export type User = {
  id: string
  lastName: string
  firstName: string
  avatarUrl: string
  email: string
  password: string
  role: Roles
  status: UserStatuses
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
