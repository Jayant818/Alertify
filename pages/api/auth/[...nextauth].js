import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { google } from "googleapis";

// export default NextAuth({
// 	providers: [
// 		{
// 			id: "google",
// 			name: "Google",
// 			type: "oauth",
// 			version: "2.0",
// 			scope: "https://www.googleapis.com/auth/gmail.readonly",
// 			params: { grant_type: "authorization_code" },
// 			accessTokenUrl: "https://oauth2.googleapis.com/token",
// 			authorizationUrl:
// 				"https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline",
// 			profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
// 			clientId: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			async profile(profile, tokens) {
// 				const oauth2Client = new google.auth.OAuth2();
// 				oauth2Client.setCredentials(tokens);
// 				const gmail = google.gmail({ version: "v1", auth: oauth2Client });
// 				const response = await gmail.users.messages.list({
// 					userId: "me",
// 					q: "label:inbox",
// 				});
// 				profile.emails = response.data.messages.map((message) => {
// 					const fromHeader = message.payload.headers.find(
// 						(header) => header.name === "From"
// 					);
// 					return fromHeader ? fromHeader.value : "";
// 				});
// 				return profile;
// 			},
// 		},
// 	],
// 	session: { jwt: true },
// 	jwt: {
// 		secret: process.env.JWT_SECRET,
// 	},
// });

import { google } from "googleapis";

export default NextAuth({
	providers: [
		{
			id: "google",
			name: "Google",
			type: "oauth",
			version: "2.0",
			scope: "https://www.googleapis.com/auth/gmail.readonly",
			params: { grant_type: "authorization_code" },
			accessTokenUrl: "https://oauth2.googleapis.com/token",
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline",
			profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			async profile(profile, tokens) {
				const oauth2Client = new google.auth.OAuth2();
				oauth2Client.setCredentials(tokens);
				const gmail = google.gmail({ version: "v1", auth: oauth2Client });
				const response = await gmail.users.messages.list({
					userId: "me",
					q: "label:inbox",
				});
				profile.emails = response.data.messages.map((message) => {
					const fromHeader = message.payload.headers.find(
						(header) => header.name === "From"
					);
					return fromHeader ? fromHeader.value : "";
				});
				return profile;
			},
		},
	],
	session: { jwt: true },
	jwt: {
		secret: "secret",
	},
	// pages: {
	// 	signIn: "/",
	// 	signOut: "/",
	// 	error: "/error",
	// },
});
