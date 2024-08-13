import NextAuth, { DefaultSession } from 'next-auth';
import { Roles } from '@/entities';


declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      lastName: string
      firstName: string
      email: string
      role: Roles
      avatarUrl: string
    } & DefaultSession['user']
  }
}