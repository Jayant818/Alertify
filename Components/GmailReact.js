//  Define a component that renders a sign-in button if not signed in, or a list of messages if signed in

import React, { useState, useEffect } from "react";
// import { useGoogleAuth, useGmailApi } from "./gmail-react";
import useGoogleAuth from "../helpers/google-auth";
import useGmailApi from "../helpers/gmail-api";
import Header from "./Header";

const GmailReact = ({ clientId, apiKey }) => {
	const [gapi, setGapi] = useState();

	useEffect(() => {
		import("gapi-cjs").then((gapi) => {
			setGapi(gapi.default.gapi);
		});
		console.log("Gapi Contains", gapi);
	}, []);

	const {
		isSignedIn,
		isInitialized,
		error: authError,
		handleSignIn,
		handleSignOut,
	} = useGoogleAuth(clientId, apiKey, gapi);
	const {
		messages,
		loading,
		error: apiError,
		fetchMessages,
	} = useGmailApi(gapi);

	// Render a loading indicator if not initialized yet
	if (!isInitialized) {
		return <div>Loading...</div>;
	}

	// Render an error message if there is any authentication or Gmail API error
	if (authError || apiError) {
		return <div>Error: {authError || apiError}</div>;
	}

	// Render a sign-in button if not signed in
	if (!isSignedIn) {
		return (
			// <button className="btn" onClick={handleSignIn}>
			// 	Sign in with Google
			// </button>
			<Header name="Sign In" handleSignIn={handleSignIn} />
		);
	}

	// Render a list of messages if signed in
	console.log(messages);
	return (
		<div>
			<button className="btn" onClick={handleSignOut}>
				Sign out
			</button>
			<button onClick={fetchMessages}>Fetch messages</button>
			{loading && <div>Loading messages...</div>}
			{messages.length > 0 && (
				<>
					<h1 className="text-2xl font-bold">
						Here are your top 10 Unread Messages
					</h1>
					<ul>
						{messages.map((message) => (
							<li key={message.id}>
								<b>{message.senderName}</b> : {message.snippet}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};
export default GmailReact;
