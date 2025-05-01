import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import bcrypt from "bcryptjs"
import connectDB from "./db"
import User from "@/models/User"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectDB()

        const user = await User.findOne({ email: credentials.email })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          image: user.profileImage || null,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "facebook") {
        try {
          await connectDB()

          // Check if user already exists
          const existingUser = await User.findOne({ email: profile.email })

          if (!existingUser) {
            // Create new user from OAuth data
            const newUser = new User({
              firstName: profile.given_name || profile.name.split(" ")[0],
              lastName: profile.family_name || profile.name.split(" ").slice(1).join(" "),
              email: profile.email,
              password: "", // No password for OAuth users
              role: "disputant", // Default role
              profileImage: profile.picture || profile.image,
              createdAt: new Date(),
            })

            await newUser.save()
          }
        } catch (error) {
          console.error("Error during OAuth sign in:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
        token.role = user.role

        // If it's an OAuth sign-in, try to get the role from the database
        if (account && (account.provider === "google" || account.provider === "facebook")) {
          try {
            await connectDB()
            const dbUser = await User.findOne({ email: profile.email })
            if (dbUser) {
              token.role = dbUser.role
              token.id = dbUser._id.toString()
            }
          } catch (error) {
            console.error("Error fetching user role:", error)
          }
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
}
