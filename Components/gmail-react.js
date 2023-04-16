// gmail-react.js

// A package that allows developers to use Gmail API in React JS
// This package assumes that the developer has already enabled the Gmail API and obtained the client ID and API key
// See https://developers.google.com/gmail/api/quickstart/js for more details

// Import React and Google API client library
import React, { useState, useEffect } from "react";

// Define some constants for the Gmail API
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";
const DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
];

// Define a custom hook that handles the authentication and authorization with Google
export const useGoogleAuth = (clientId, apiKey, gapi) => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [error, setError] = useState(null);

	// Define a helper function that loads the Google API client library and initializes it with the given credentials
	const initClient = async () => {
		gapi.client
			.init({
				apiKey: apiKey,
				clientId: clientId,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			})
			.then(
				() => {
					// Listen for sign-in state changes
					gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);

					// Handle the initial sign-in state
					setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
					setIsInitialized(true);
				},
				(error) => {
					setError(error);
				}
			);
	};

	// Define a helper function that handles the sign-in process
	const handleSignIn = () => {
		gapi.auth2.getAuthInstance().signIn();
	};

	// Define a helper function that handles the sign-out process
	const handleSignOut = () => {
		gapi.auth2.getAuthInstance().signOut();
	};

	// Load the Google API client library and initialize it when the component mounts
	useEffect(() => {
		if (gapi) {
			gapi.load("client:auth2", initClient);
		}
	}, [gapi]);

	// Return an object that contains the state and handler functions
	return {
		isSignedIn,
		isInitialized,
		error,
		handleSignIn,
		handleSignOut,
	};
};

// Define a custom hook that handles the Gmail API requests

// Define a custom hook that handles the Gmail API requests
export const useGmailApi = (gapi) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMessages = async () => {
		if (!gapi) return;

		setLoading(true);
		try {
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
			});
			const messageIds = response.result.messages;
			const messages = await Promise.all(
				messageIds.map(async (messageId) => {
					const response = await gapi.client.gmail.users.messages.get({
						userId: "me",
						id: messageId.id,
						format: "full",
					});
					return response.result;
				})
			);
			setMessages(messages);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const checkNewMessages = async () => {
		if (!gapi) return;

		try {
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				maxResults: 1,
			});
			const latestMessageId = response.result.messages[0].id;

			if (messages.length === 0 || latestMessageId !== messages[0].id) {
				const response = await gapi.client.gmail.users.messages.get({
					userId: "me",
					id: latestMessageId,
					format: "full",
				});
				const newMessage = response.result;
				setMessages([newMessage, ...messages]);
			}
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		let intervalId;
		if (
			gapi &&
			gapi.auth2.getAuthInstance().isSignedIn.get() &&
			messages.length > 0
		) {
			intervalId = setInterval(() => {
				checkNewMessages();
			}, 10000);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [messages]);

	return {
		messages,
		loading,
		error,
		fetchMessages,
	};
};

// Define a component that renders a sign-in button if not signed in, or a list of messages if signed in
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
		return <button onClick={handleSignIn}>Sign in with Google</button>;
	}

	// Render a list of messages if signed in
	return (
		<div>
			<button onClick={handleSignOut}>Sign out</button>
			<button onClick={fetchMessages}>Fetch messages</button>
			{loading && <div>Loading messages...</div>}
			{messages.length > 0 && (
				<ul>
					{messages.map((message) => (
						<li key={message.id}>{message.snippet}</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default GmailReact;
