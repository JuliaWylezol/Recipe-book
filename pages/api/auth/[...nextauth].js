import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import authorizeUser from '../../../services/users/authorizeUser';

export default NextAuth({
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  // jwt: {
  //   signingKey: { kty: 'oct', kid: '--', alg: 'HS256', k: '--' },
  //   verificationOptions: {
  //     algorithms: ['HS256']
  //   }
  // },
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await authorizeUser({
          email: credentials.email,
          password: credentials.password
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.name = user?.fullName;
        token.email = user?.email;
        token.id = user?.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.name = token?.name;
      session.user.email = token?.email;
      session.user.id = token?.id;
      return session;
    }
  }
});
