import clientPromise from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { mongooseConnect } from "@/lib/mongoose";
import { createKey } from "next/dist/shared/lib/router/router";

async function isAdminEmail(email) {
  // return true;
  await mongooseConnect();
  const admin = await Admin.findOne({ email });

  return !!admin;
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (user) {
        const isAdmin = await isAdminEmail(user?.email);

        session.isAdmin = isAdmin;
      }
      return session;
      // if (await isAdminEmail(session?.user?.email)) {
      //   return session;
      // } else {
      //   return false;
      // }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!(await isAdminEmail(session?.user?.email))) {
    res.status(401);
    res.end();
    throw new Error("User is not an admin");
  }
}
