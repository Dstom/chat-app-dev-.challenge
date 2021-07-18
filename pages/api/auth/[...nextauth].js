import NextAuth from "next-auth";
import Providers from 'next-auth/providers';
import { verifyPassword } from "../../../lib/auth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { getUser } from "../../../services/getUser";



export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                await dbConnect();

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) {
                    throw new Error('Could not log you in');
                }
                return { email: user.email, image: user.profile, name: user.username };
            }
        })
    ]
});

