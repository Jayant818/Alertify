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

const useGmailApi = (gapi) => {
	const [name, setName] = useState("");
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [labels, setLabels] = useState([]);

	const fetchLabels = async () => {
		if (!gapi) return;

		try {
			const response = await gapi.client.gmail.users.labels.list({
				userId: "me",
			});
			setLabels(response.result.labels);
		} catch (error) {
			setError(error);
		}
	};

	const fetchMessages = async () => {
		if (!gapi) return;

		setLoading(true);
		try {
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: "is:unread",
				maxResults: 10,
			});
			const messageIds = response.result.messages;
			const messages = await Promise.all(
				messageIds.map(async (messageId) => {
					const response = await gapi.client.gmail.users.messages.get({
						userId: "me",
						id: messageId.id,
						format: "full",
					});
					const headers = response.result.payload.headers;
					const fromHeader = headers.find((header) => header.name === "From");
					const senderName = fromHeader
						? fromHeader.value.split("<")[0].trim()
						: "Unknown sender";
					const messageWithSender = { ...response.result, senderName };
					return messageWithSender;
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
				q: "is:unread",
				maxResults: 1,
			});
			const latestMessageId = response.result.messages[0].id;

			if (messages.length === 0 || latestMessageId !== messages[0].id) {
				const response = await gapi.client.gmail.users.messages.get({
					userId: "me",
					id: latestMessageId,
					format: "full",
				});
				const headers = response.result.payload.headers;
				const fromHeader = headers.find((header) => header.name === "From");
				const senderName = fromHeader
					? fromHeader.value.split("<")[0].trim()
					: "Unknown sender";
				const newMessage = { ...response.result, senderName };
				setMessages((prevMessages) => [newMessage, ...prevMessages]);
			}
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		let intervalId;
		if (gapi && gapi.auth2.getAuthInstance().isSignedIn.get()) {
			fetchLabels();
			fetchMessages();
			intervalId = setInterval(() => {
				checkNewMessages();
			}, 100000);

			// Get the user name
			const user = gapi.auth2.getAuthInstance().currentUser.get();
			setName(user.getBasicProfile().getName());
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
		name,
		labels,
	};
};

export default useGmailApi;
