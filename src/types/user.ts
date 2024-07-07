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
