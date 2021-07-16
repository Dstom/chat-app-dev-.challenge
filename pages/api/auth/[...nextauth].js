import NextAuth from "next-auth";
import Providers from 'next-auth/providers';
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const db = client.db();

                const user = await db.collection('users').findOne({ email: credentials.email });
                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(credentials.password, user.password);
                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in');
                }
                client.close();
                return { email: user.email, image: user.profile, name: user.username };
            }
        })
    ],
    callbacks: {
        async session(session, token) {
            // Add property to session, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    }
});

