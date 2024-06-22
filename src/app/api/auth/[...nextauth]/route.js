import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: { params: { scope: 'profile email openid' } },
      issuer: 'https://www.linkedin.com/',
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        }
      }
    }),
  ],

  // debug: true,
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.userFirstChar = session.user.name.slice(0, 1).toLocaleLowerCase();
      session.user.userLastName = session.user.name.split(' ')[1].toLocaleLowerCase();
      session.user.username = session.user.userFirstChar.concat(session.user.userLastName);
      session.user.uid = token.sub;
      return session
    }
  }
});

export { handler as GET, handler as POST }
