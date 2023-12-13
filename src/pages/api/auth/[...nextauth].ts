import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/models';


const getProfile = async (profile:any) =>{ 

    const data = await UserModel.findOne({email: profile.email, status: 'active'})

    console.log("profile")

    if(data){
        return { 
            role: data.roole,
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture
        }
    }

    return { 
        role: profile.role ?? "user",
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture
    }
}

export default NextAuth({
    // Konfigürasyon ayarları
    providers: [
        GithubProvider({
            profile : getProfile,
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
            // @ts-ignore
            scope: "read:user",
        }),
        GoogleProvider({
            profile : getProfile,
            clientId: process.env.GOOGLE_ID || "449390946871-e9cg6tmk9holc62v2ra062srhk5iit7b.apps.googleusercontent.com",
            clientSecret: process.env.GOOGLE_SECRET || "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",
        }),
        // Diğer sağlayıcılar buraya eklenebilir
    ],


    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: 'jwt'

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            //  console.log(user, account, profile, email, credentials)

            await dbConnect()

            const data = await UserModel.findOne({email: user.email, status: 'active'})

            console.log('signIn')

            if (!data) return false;   
            
            if(!data.signed) {
                data.name = user.name || data.name,
                data.image = user.image || data.image;
                data.signed = true;
                await data.save()
            }

            return true;
        },
        async redirect({ url, baseUrl }) { return baseUrl },
        async session({ session, token, user }) { 
            console.log('session')
            const newSession:any = { ...session}
            newSession.user.role = token.role
            return newSession
        },
      
        async jwt({ token, user, account, profile }) { 
            console.log('jwt')
            if(user) token.role = (user as any).role
            return token 
        }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
    // Daha fazla konfigürasyon seçenekleri
});



// ((profile: any, tokens: TokenSetParameters) => Awaitable<User>) | undefined


