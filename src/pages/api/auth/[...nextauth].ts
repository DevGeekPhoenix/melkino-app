import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        let user = null

        const data = await res.json()
        if (data && data.data) user = data.data

        if (user) {
          return {
            name: user.name,
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            id: user.id,
            userAds: user.userAds,
          }
        } else {
          throw new Error(data.message)
        }
      },
    }),
  ],
  jwt: {
    maxAge: 24 * 60 * 60 * 30,
    secret: process.env.NEXTAUTH_SECRET,
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 * 30,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as User
      }

      return session
    },
  },
  events: {
    async session() {},
  },

  debug: process.env.LOG_NEXTAUTH === 'true',
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(message) {
      console.warn(message)
    },
    debug(message, object) {
      console.debug(message, object)
    },
  },
}

export default NextAuth(authOptions)
