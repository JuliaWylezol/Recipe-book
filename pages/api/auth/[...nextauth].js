import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import authorizeUser from '../../../services/users/authorizeUser';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
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
      }
      return token;
    }
  }
});
