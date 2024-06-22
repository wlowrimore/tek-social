import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
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
