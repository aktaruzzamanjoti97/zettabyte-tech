import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
	],
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnProfile = nextUrl.pathname.startsWith('/profile');

			if (isOnProfile) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			}

			return true;
		},
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.image = user.image;
			}
			return token;
		},
		session({ session, token }) {
			if (session?.user && token) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
	trustHost: true,
};
