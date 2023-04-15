// gmail-react.js

// A package that allows developers to use Gmail API in React JS
// This package assumes that the developer has already enabled the Gmail API and obtained the client ID and API key
// See https://developers.google.com/gmail/api/quickstart/js for more details

// Import React and Google API client library
import React, { useState, useEffect } from "react";
import { gapi } from "gapi-cjs";

// Define some constants for the Gmail API
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";
const DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
];

// Define a custom hook that handles the authentication and authorization with Google
export const useGoogleAuth = (clientId, apiKey) => {
	// Initialize the state variables
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [error, setError] = useState(null);

	// Define a helper function that loads the Google API client library and initializes it with the given credentials
	const initClient = () => {
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
		gapi.load("client:auth2", initClient);
	}, []);

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
export const useGmailApi = () => {
	// Initialize the state variables
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Define a helper function that fetches the messages from the Gmail API
	const fetchMessages = async () => {
		setLoading(true);
		try {
			// Get the list of message IDs from the Gmail API
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
			});
			const messageIds = response.result.messages;

			// Get the details of each message from the Gmail API
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

			// Update the state with the fetched messages
			setMessages(messages);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	// Return an object that contains the state and handler functions
	return {
		messages,
		loading,
		error,
		fetchMessages,
	};
};

// Define a component that renders a sign-in button if not signed in, or a list of messages if signed in
const GmailReact = ({ clientId, apiKey }) => {
	// Use the custom hooks to get the authentication and Gmail API data and functions
	const {
		isSignedIn,
		isInitialized,
		error: authError,
		handleSignIn,
		handleSignOut,
	} = useGoogleAuth(clientId, apiKey);
	const { messages, loading, error: apiError, fetchMessages } = useGmailApi();

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
