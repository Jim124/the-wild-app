import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // CredentialProvider,
  ],
  callbacks: {
    authorized(auth, request) {
      return !!auth?.auth?.user;
    },
  },
  pages: {
    signIn: '/login',
    // signOut:',
  },
};
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
