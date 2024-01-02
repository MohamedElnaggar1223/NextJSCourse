import UserPrompt from "@models/User";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await UserPrompt.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString()
    
            return session
        },
        async signIn({ profile }) {
            try
            {
                await connectToDB()
    
                const userExists = await UserPrompt.findOne({
                    email: profile.email
                })
    
                if(!userExists){
                    await UserPrompt.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
    
                return true
            }
            catch(e)
            {
                console.error(e)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }