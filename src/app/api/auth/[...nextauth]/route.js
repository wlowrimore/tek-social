import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
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
