export type User = {
  id: string
  lastName: string
  firstName: string
  avatarUrl: string
  email: string
  password: string
  role: string
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
