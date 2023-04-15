// pages/api/gmail.js
import { getSession } from "next-auth/react";
import { google } from "googleapis";

// The scopes required for the Gmail API
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export default async function handler(req, res) {
	try {
		// Get the session from Next-auth
		const session = await getSession({ req });

		// Check if the user is authenticated
		if (session) {
			console.log("User is Authenticated");
			// Create a Gmail client with the access token
			const gmail = google.gmail({
				version: "v1",
				auth: session.accessToken,
			});

			// Get the list of labels from the Gmail API
			const { data } = await gmail.users.labels.list({
				userId: "me",
			});

			// Send back the response as JSON
			res.status(200).json(data);
		} else {
			// Return an unauthorized error
			res.status(401).json({ error: "Not authenticated" });
		}
	} catch (error) {
		// Handle any errors
		res.status(500).json({ error: error.message });
	}
}
