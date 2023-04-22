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
	const [FormMessages, setFormMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [labels, setLabels] = useState([]);
	const [labelsArray, setLabelsArray] = useState([]);
	const [textArray, setTextArray] = useState([]);
	const [emailsArray, setEmailsArray] = useState([]);

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

	// const fetchMessages = async () => {
	// 	if (!gapi) return;

	// 	setLoading(true);
	// 	try {
	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: "is:unread",
	// 			maxResults: 4,
	// 		});
	// 		const messageIds = response.result.messages;
	// 		const messages = await Promise.all(
	// 			messageIds.map(async (messageId) => {
	// 				const response = await gapi.client.gmail.users.messages.get({
	// 					userId: "me",
	// 					id: messageId.id,
	// 					format: "full",
	// 				});
	// 				const headers = response.result.payload.headers;
	// 				const fromHeader = headers.find((header) => header.name === "From");
	// 				const senderName = fromHeader
	// 					? fromHeader.value.split("<")[0].trim()
	// 					: "Unknown sender";
	// 				const messageWithSender = { ...response.result, senderName };
	// 				return messageWithSender;
	// 			})
	// 		);
	// 		setMessages(messages);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		setError(error);
	// 		setLoading(false);
	// 	}
	// };

	const fetchMessages = async () => {
		if (!gapi) return;
		setLoading(true);
		try {
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: "is:unread",
				maxResults: 4,
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
					messageWithSender.markAsReadAndArchived = async () => {
						try {
							await gapi.client.gmail.users.messages.modify({
								userId: "me",
								id: messageId.id,
								removeLabelIds: ["UNREAD"],
								addLabelIds: ["INBOX"],
							});
							console.log("Called");
						} catch (error) {
							console.error(error);
						}
					};
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

	// const fetchFormMessages = async (labels = [], text = [], emails = []) => {
	// 	if (!gapi) return;

	// 	// setLoading(true);
	// 	try {
	// 		const query = [
	// 			...(labels.length ? labels.map((label) => `label:${label}`) : []),
	// 			...(text.length ? text.map((t) => `"${t}"`) : []),
	// 			...(emails.length ? emails.map((email) => `from:${email}`) : []),
	// 		].join(" OR ");

	// 		console.log("query", query);

	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: `is:unread ${query}`,
	// 			maxResults: 4,
	// 		});
	// 		console.log("response", response);

	// 		const messageIds = response.result.messages;
	// 		const messages = await Promise.all(
	// 			messageIds.map(async (messageId) => {
	// 				const response = await gapi.client.gmail.users.messages.get({
	// 					userId: "me",
	// 					id: messageId.id,
	// 					format: "full",
	// 				});
	// 				const headers = response.result.payload.headers;
	// 				const fromHeader = headers.find((header) => header.name === "From");
	// 				const senderName = fromHeader
	// 					? fromHeader.value.split("<")[0].trim()
	// 					: "Unknown sender";
	// 				const messageWithSender = { ...response.result, senderName };
	// 				return messageWithSender;
	// 			})
	// 		);
	// 		console.log("message", messages);

	// 		setFormMessages(messages);
	// 		// setLoading(false);
	// 	} catch (error) {
	// 		setError(error);
	// 		// setLoading(false);
	// 	}
	// };

	// const fetchFormMessages = async (labels = [], text = [], emails = []) => {
	// 	if (!gapi) return;

	// 	try {
	// 		const query = [
	// 			...(labels.length ? labels.map((label) => `label:${label}`) : []),
	// 			...(text.length ? text.map((t) => `"${t}"`) : []),
	// 			...(emails.length
	// 				? emails.map((email) => `from:${email}`).join(" OR ")
	// 				: ""),
	// 		]
	// 			.filter(Boolean)
	// 			.join(" OR ");

	// 		console.log("query", query);

	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: `is:unread ${query}`,
	// 			maxResults: 4,
	// 		});

	// 		console.log("response", response);

	// 		const messageIds = response.result.messages;

	// 		const messages = await Promise.all(
	// 			messageIds.map(async (messageId) => {
	// 				const response = await gapi.client.gmail.users.messages.get({
	// 					userId: "me",
	// 					id: messageId.id,
	// 					format: "full",
	// 				});

	// 				const headers = response.result.payload.headers;
	// 				const fromHeader = headers.find((header) => header.name === "From");
	// 				const senderName = fromHeader
	// 					? fromHeader.value.split("<")[0].trim()
	// 					: "Unknown sender";
	// 				const messageWithSender = { ...response.result, senderName };

	// 				return messageWithSender;
	// 			})
	// 		);

	// 		console.log("message", messages);

	// 		setFormMessages(messages);
	// 	} catch (error) {
	// 		setError(error);
	// 	}
	// };

	// const fetchFormMessages = async (labels = [], text = [], emails = []) => {
	// 	if (!gapi) return;

	// 	try {
	// 		const query = [
	// 			...(labels.length ? [`label:${labels.join(" OR label:")}`] : []),
	// 			...(text.length ? text.map((t) => `"${t}"`).join(" OR ") : ""),
	// 			...(emails.length ? emails.join(" OR ") : ""),
	// 		]
	// 			.filter(Boolean)
	// 			.join(" OR ");

	// 		console.log("query", query);

	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: `is:unread ${query}`,
	// 			maxResults: 4,
	// 		});

	// 		console.log("response", response);

	// 		const messageIds = response.result.messages;

	// 		const messages = await Promise.all(
	// 			messageIds.map(async (messageId) => {
	// 				const response = await gapi.client.gmail.users.messages.get({
	// 					userId: "me",
	// 					id: messageId.id,
	// 					format: "full",
	// 				});

	// 				const headers = response.result.payload.headers;
	// 				const fromHeader = headers.find((header) => header.name === "From");
	// 				const senderName = fromHeader
	// 					? fromHeader.value.split("<")[0].trim()
	// 					: "Unknown sender";
	// 				const messageWithSender = { ...response.result, senderName };

	// 				return messageWithSender;
	// 			})
	// 		);

	// 		console.log("message", messages);

	// 		setFormMessages(messages);
	// 	} catch (error) {
	// 		setError(error);
	// 	}
	// };

	const fetchFormMessages = async (labels = [], text = [], emails = []) => {
		if (!gapi) return;

		try {
			setEmailsArray(emails);
			setLabelsArray(labels);
			setTextArray(text);
			const date = new Date();
			const formattedDate = `${date.getFullYear()}/${
				date.getMonth() + 1
			}/${date.getDate()}`;

			const query = [
				`after:${formattedDate}`,
				...(labels.length ? labels.map((label) => `label:${label}`) : []),
				...(text.length ? text.map((t) => `"${t}"`) : []),
				...(emails.length
					? emails.map((email) => `from:${email}`).join(" OR ")
					: ""),
			]
				.filter(Boolean)
				.join(" OR ");

			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: `is:unread ${query}`,
				maxResults: 4,
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

					messageWithSender.markAsReadAndArchived = async () => {
						try {
							await gapi.client.gmail.users.messages.modify({
								userId: "me",
								id: messageId.id,
								removeLabelIds: ["UNREAD"],
								addLabelIds: ["INBOX"],
							});
							console.log("Message marked as read and archived.");
						} catch (error) {
							console.error(error);
						}
					};

					return messageWithSender;
				})
			);
			setFormMessages(messages);
		} catch (error) {
			setError(error);
		}
	};

	// const checkNewMessages = async () => {
	// 	if (!gapi) return;

	// 	try {
	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: "is:unread",
	// 			maxResults: 1,
	// 		});
	// 		const latestMessageId = response.result.messages[0].id;

	// 		if (messages.length === 0 || latestMessageId !== messages[0].id) {
	// 			const response = await gapi.client.gmail.users.messages.get({
	// 				userId: "me",
	// 				id: latestMessageId,
	// 				format: "full",
	// 			});
	// 			const headers = response.result.payload.headers;
	// 			const fromHeader = headers.find((header) => header.name === "From");
	// 			const senderName = fromHeader
	// 				? fromHeader.value.split("<")[0].trim()
	// 				: "Unknown sender";
	// 			const newMessage = { ...response.result, senderName };
	// 			setMessages((prevMessages) => [newMessage, ...prevMessages]);
	// 		}
	// 	} catch (error) {
	// 		setError(error);
	// 	}
	// };

	const checkNewMessages = async () => {
		console.log("Hi");
		if (!gapi) return;
		console.log("Hello");

		try {
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: "is:unread",
				maxResults: 1,
			});
			const latestMessageId = response.result.messages[0].id;
			console.log("How do you do");

			if (messages.length === 0 || latestMessageId !== messages[0].id) {
				console.log("How do you do2");
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

				// check if the new message has any label from the labelsArray state
				const labelIds = newMessage.labelIds;
				const isLabelMatched = labelIds.some((label) =>
					labelsArray.includes(label)
				);

				// check if the sender of the new message is in the emailsArray state
				const senderEmail = fromHeader
					? fromHeader.value.match(/<([^>]+)>/)[1]
					: null;
				const isSenderMatched = senderEmail
					? emailsArray.includes(senderEmail)
					: false;

				// check if the body of the new message contains any text from the textArray state
				const body = newMessage.snippet;
				const isTextMatched = textArray.some((text) => body.includes(text));

				// set the color property to red if any of the conditions are true
				console.log("Hello ", ...labelsArray, ...emailsArray, ...textArray);
				if (isLabelMatched || isSenderMatched || isTextMatched) {
					newMessage.color = "red";
				}

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
				console.log("Checking");
				checkNewMessages();
			}, 1000);

			// Get the user name
			const user = gapi.auth2.getAuthInstance().currentUser.get();
			setName(user.getBasicProfile().getName());
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [messages]);

	useEffect(() => {
		// do something when the FormMessages state changes
		console.log("FormMessages updated:", FormMessages);
	}, [FormMessages]);

	return {
		messages,
		loading,
		error,
		fetchMessages,
		name,
		labels,
		fetchFormMessages,
		FormMessages,
		setMessages,
	};
};

export default useGmailApi;
