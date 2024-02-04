import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "text"},
                password: { label: "password", type: "password"},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                //find user using email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                //if user not adgist
                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare (
                    credentials.password,
                    user.hashedPassword //hased pass that save into database 
                );

                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user; //if all of the validation is pass 
                //safily back to user our client
            }
        })
    ],
    pages: {
        signIn: '/', //when any error happen or any type of callback we redirect to / page means navbar pag
    },
    debug: process.env.NODE_ENV !== 'production' ,
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};
 
export default NextAuth(authOptions);
//////////////////////////////////////////////////////