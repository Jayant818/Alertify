import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URI = "http://localhost:3000/api/oauth/callback";

export function getAuthUrl() {
	const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/gmail.readonly"],
	});
	return authUrl;
}

export async function getAccessToken(code) {
	const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
	const { tokens } = await oAuth2Client.getToken(code);
	return tokens;
}

export async function getAuthenticatedClient(tokens) {
	const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
	oAuth2Client.setCredentials(tokens);
	const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
	return gmail;
}
