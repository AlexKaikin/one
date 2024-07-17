import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserModel } from '@/app/api/users/model'
import { connectDB } from '@/config/db'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },

      async authorize(credentials) {
        if (credentials) {
          try {
            await connectDB()

            const { email, password } = credentials
            const user = await UserModel.findOne({ email })

            if (!user) throw new Error('Wrong credentials')

            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            )

            if (!isPasswordCorrect) throw new Error('Wrong credentials')

            return user
          } catch (error) {
            throw new Error('Something went wrong')
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.lastName = user.lastName
        token.firstName = user.firstName
        token.email = user.email
        token.id = user.id
        token.role = user.role
      }

      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.lastName = token.lastName
        session.user.firstName = token.firstName
        session.user.email = token.email
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },
}
