import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      lastName: string
      firstName: string
      email: string
    }
  }
}
