import React, { useState, useEffect, useMemo } from "react";

const SCOPES =
	"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify";
const DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
];

const useGoogleAuth = (clientId, apiKey, gapi) => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [error, setError] = useState(null);

	const initClient = useMemo(
		() => async () => {
			try {
				await gapi.client.init({
					apiKey: apiKey,
					clientId: clientId,
					discoveryDocs: DISCOVERY_DOCS,
					scope: SCOPES,
				});
				gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
				setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
				setIsInitialized(true);
			} catch (error) {
				setError(error);
			}
		},
		[apiKey, clientId, gapi]
	);

	const handleSignIn = () => {
		gapi.auth2.getAuthInstance().signIn();
	};

	const handleSignOut = () => {
		gapi.auth2.getAuthInstance().signOut();
	};

	useEffect(() => {
		if (gapi) {
			gapi.load("client:auth2", initClient);
		}
	}, [gapi, initClient]);

	return {
		isSignedIn,
		isInitialized,
		error,
		handleSignIn,
		handleSignOut,
	};
};

export default useGoogleAuth;

// // gmail-react.js

// // A package that allows developers to use Gmail API in React JS
// // This package assumes that the developer has already enabled the Gmail API and obtained the client ID and API key
// // See https://developers.google.com/gmail/api/quickstart/js for more details

// // Import React and Google API client library
// import React, { useState, useEffect } from "react";

// // Define some constants for the Gmail API
// const SCOPES =
// 	"https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify";
// const DISCOVERY_DOCS = [
// 	"https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
// ];

// // Define a custom hook that handles the authentication and authorization with Google
// const useGoogleAuth = (clientId, apiKey, gapi) => {
// 	const [isSignedIn, setIsSignedIn] = useState(false);
// 	const [isInitialized, setIsInitialized] = useState(false);
// 	const [error, setError] = useState(null);

// 	// Define a helper function that loads the Google API client library and initializes it with the given credentials
// 	const initClient = async () => {
// 		gapi.client
// 			.init({
// 				apiKey: apiKey,
// 				clientId: clientId,
// 				discoveryDocs: DISCOVERY_DOCS,
// 				scope: SCOPES,
// 			})
// 			.then(
// 				() => {
// 					// Listen for sign-in state changes
// 					gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);

// 					// Handle the initial sign-in state
// 					setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
// 					setIsInitialized(true);
// 				},
// 				(error) => {
// 					setError(error);
// 				}
// 			);
// 	};

// 	// Define a helper function that handles the sign-in process
// 	const handleSignIn = () => {
// 		gapi.auth2.getAuthInstance().signIn();
// 	};

// 	// Define a helper function that handles the sign-out process
// 	const handleSignOut = () => {
// 		gapi.auth2.getAuthInstance().signOut();
// 	};

// 	// Load the Google API client library and initialize it when the component mounts
// 	useEffect(() => {
// 		if (gapi) {
// 			gapi.load("client:auth2", initClient);
// 		}
// 	}, [gapi]);

// 	// Return an object that contains the state and handler functions
// 	return {
// 		isSignedIn,
// 		isInitialized,
// 		error,
// 		handleSignIn,
// 		handleSignOut,
// 	};
// };

// export default useGoogleAuth;
