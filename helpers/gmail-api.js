// gmail-react.js

// A package that allows developers to use Gmail API in React JS
// This package assumes that the developer has already enabled the Gmail API and obtained the client ID and API key
// See https://developers.google.com/gmail/api/quickstart/js for more details

// Import React and Google API client library
import React, { useState, useEffect, useMemo } from "react";

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
	const [FilteredMessages, setFilteredMessages] = useState([]);

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

	// const fetchMessages = useMemo(async () => {
	// 	if (!gapi) return;
	// 	// setLoading(true);
	// 	try {
	// 		console.log("Running");

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
	// 				messageWithSender.markAsReadAndArchived = async () => {
	// 					try {
	// 						await gapi.client.gmail.users.messages.modify({
	// 							userId: "me",
	// 							id: messageId.id,
	// 							removeLabelIds: ["UNREAD"],
	// 							addLabelIds: ["INBOX"],
	// 						});
	// 						console.log("Called");
	// 					} catch (error) {
	// 						console.error(error);
	// 					}
	// 				};
	// 				messageWithSender.delete = async () => {
	// 					try {
	// 						await gapi.client.gmail.users.messages.trash({
	// 							userId: "me",
	// 							id: messageId.id,
	// 						});
	// 						console.log("Deleted message with ID", messageId.id);
	// 					} catch (error) {
	// 						console.error(error);
	// 					}
	// 				};
	// 				return messageWithSender;
	// 			})
	// 		);

	// 		// check if the new message has any label from the labelsArray state
	// 		const labelIds = messages[0].labelIds;
	// 		const isLabelMatched = labelIds.some((label) =>
	// 			labelsArray.includes(label)
	// 		);

	// 		// check if the sender of the new message is in the emailsArray state
	// 		// const senderEmail = fromHeader
	// 		// 	? fromHeader.value.match(/<([^>]+)>/)[1]
	// 		// 	: null;
	// 		// const isSenderMatched = senderEmail
	// 		// 	? emailsArray.includes(senderEmail)
	// 		// 	: false;

	// 		// check if the body of the new message contains any text from the textArray state
	// 		const body = messages[0].snippet;
	// 		const isTextMatched = textArray.some((text) => body.includes(text));

	// 		// set the color property to red if any of the conditions are true
	// 		console.log("Hello ", ...labelsArray, ...emailsArray, ...textArray);
	// 		if (isLabelMatched || isTextMatched) {
	// 			messages[0].color = "red";
	// 		}

	// 		setMessages(messages);
	// 		// setLoading(false);
	// 	} catch (error) {
	// 		setError(error);
	// 		// setLoading(false);
	// 	}
	// }, [gapi, labelsArray, textArray, messages]);

	const fetchMessages = async () => {
		if (!gapi) return;
		// setLoading(true);
		try {
			console.log("Running");

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
					messageWithSender.delete = async () => {
						try {
							await gapi.client.gmail.users.messages.trash({
								userId: "me",
								id: messageId.id,
							});
							console.log("Deleted message with ID", messageId.id);
						} catch (error) {
							console.error(error);
						}
					};
					return messageWithSender;
				})
			);

			// check if the new message has any label from the labelsArray state
			const labelIds = messages[0].labelIds;
			const isLabelMatched = labelIds.some((label) =>
				labelsArray.includes(label)
			);

			// check if the sender of the new message is in the emailsArray state
			// const senderEmail = fromHeader
			// 	? fromHeader.value.match(/<([^>]+)>/)[1]
			// 	: null;
			// const isSenderMatched = senderEmail
			// 	? emailsArray.includes(senderEmail)
			// 	: false;

			// check if the body of the new message contains any text from the textArray state
			const body = messages[0].snippet;
			const isTextMatched = textArray.some((text) => body.includes(text));

			// set the color property to red if any of the conditions are true
			console.log("Hello ", ...labelsArray, ...emailsArray, ...textArray);
			if (isLabelMatched || isTextMatched) {
				messages[0].color = "red";
			}

			setMessages(messages);
			// setLoading(false);
		} catch (error) {
			setError(error);
			// setLoading(false);
		}
	};

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

	// const fetchFormMessages = async (labels = [], text = [], emails = []) => {
	// 	if (!gapi) return;

	// 	try {
	// 		setEmailsArray(emails);
	// 		setLabelsArray(labels);
	// 		setTextArray(text);
	// 		const date = new Date();
	// 		const formattedDate = `${date.getFullYear()}/${
	// 			date.getMonth() + 1
	// 		}/${date.getDate()}`;

	// 		const query = [
	// 			`after:${formattedDate}`,
	// 			...(labels.length ? labels.map((label) => `label:${label}`) : []),
	// 			...(text.length ? text.map((t) => `"${t}"`) : []),
	// 			...(emails.length
	// 				? emails.map((email) => `from:${email}`).join(" OR ")
	// 				: ""),
	// 		]
	// 			.filter(Boolean)
	// 			.join(" OR ");

	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: `is:unread ${query}`,
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

	// 				messageWithSender.markAsReadAndArchived = async () => {
	// 					try {
	// 						await gapi.client.gmail.users.messages.modify({
	// 							userId: "me",
	// 							id: messageId.id,
	// 							removeLabelIds: ["UNREAD"],
	// 							addLabelIds: ["INBOX"],
	// 						});
	// 						console.log("Message marked as read and archived.");
	// 					} catch (error) {
	// 						console.error(error);
	// 					}
	// 				};

	// 				return messageWithSender;
	// 			})
	// 		);
	// 		setFormMessages(messages);
	// 	} catch (error) {
	// 		setError(error);
	// 	}
	// };

	// const fetchFormMessages = async (labels = [], text = [], emails = []) => {
	// 	if (!gapi) return;
	// 	try {
	// 		setEmailsArray(emails);
	// 		setLabelsArray(labels);
	// 		setTextArray(text);
	// 		const date = new Date();
	// 		const formattedDate = `${date.getFullYear()}/${
	// 			date.getMonth() + 1
	// 		}/${date.getDate()}`;
	// 		const query = [
	// 			`after:${formattedDate}`,
	// 			...(labels.length ? labels.map((label) => `label:${label}`) : []),
	// 			...(text.length ? text.map((t) => `"${t}"`) : []),
	// 			...(emails.length
	// 				? emails.map((email) => `from:${email}`).join(" OR ")
	// 				: ""),
	// 		]
	// 			.filter(Boolean)
	// 			.join(" OR ");

	// 		const response = await gapi.client.gmail.users.messages.list({
	// 			userId: "me",
	// 			q: `is:unread ${query}`,
	// 		});
	// 		const messageIds = response.result.messages;
	// 		const filteredMessages = [];

	// 		if (messageIds) {
	// 			const messages = await Promise.all(
	// 				messageIds.map(async (messageId) => {
	// 					const response = await gapi.client.gmail.users.messages.get({
	// 						userId: "me",
	// 						id: messageId.id,
	// 						format: "full",
	// 					});
	// 					const headers = response.result.payload.headers;
	// 					const fromHeader = headers.find((header) => header.name === "From");
	// 					const senderName = fromHeader
	// 						? fromHeader.value.split("<")[0].trim()
	// 						: "Unknown sender";
	// 					const messageWithSender = { ...response.result, senderName };
	// 					messageWithSender.markAsReadAndArchived = async () => {
	// 						try {
	// 							await gapi.client.gmail.users.messages.modify({
	// 								userId: "me",
	// 								id: messageId.id,
	// 								removeLabelIds: ["UNREAD"],
	// 								addLabelIds: ["INBOX"],
	// 							});
	// 							console.log("Message marked as read and archived.");
	// 						} catch (error) {
	// 							console.error(error);
	// 						}
	// 					};

	// 					// Check if message matches any of the filter criteria
	// 					const matchesLabel = labels.length
	// 						? labels.some((label) =>
	// 								headers.some(
	// 									(header) =>
	// 										header.name === "Label" && header.value === label
	// 								)
	// 						  )
	// 						: true;
	// 					const matchesText = text.length
	// 						? text.some((t) => messageWithSender.snippet.includes(t))
	// 						: true;
	// 					const matchesEmail = emails.length
	// 						? emails.some(
	// 								(email) => fromHeader && fromHeader.value.includes(email)
	// 						  )
	// 						: true;

	// 					if (matchesLabel || matchesText || matchesEmail) {
	// 						filteredMessages.push({
	// 							message: messageWithSender,
	// 							read: false,
	// 							readMessage: async () => {
	// 								try {
	// 									await gapi.client.gmail.users.messages.modify({
	// 										userId: "me",
	// 										id: messageId.id,
	// 										removeLabelIds: ["UNREAD"],
	// 									});
	// 									console.log("Message marked as read.");
	// 									filteredMessages.find(
	// 										(m) => m.message.id === messageId.id
	// 									).read = true;
	// 								} catch (error) {
	// 									console.error(error);
	// 								}
	// 							},
	// 						});
	// 					}

	// 					return messageWithSender;
	// 				})
	// 			);

	// 			// Set state with all messages fetched, regardless of whether they matched the filters
	// 			setFormMessages(messages);
	// 		} else {
	// 			setFormMessages([]);
	// 		}

	// 		// Set state with filtered messages
	// 		setFilteredMessages(filteredMessages);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const fetchFormMessages = async (labels = [], text = [], emails = []) => {
		if (!gapi) return;
		try {
			console.log("Labels", labels);
			setEmailsArray(emails);
			setLabelsArray(labels);
			setTextArray(text);
			const date = new Date();
			const formattedDate = `${date.getFullYear()}/${
				date.getMonth() + 1
			}/${date.getDate()}`;
			const nextDate = `${date.getFullYear()}/${date.getMonth() + 1}/${
				date.getDate() + 1
			}`;
			const query = [
				`after:${formattedDate}`,
				`before:${nextDate}`,
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
			});

			// const messagesResponse = await gapi.client.gmail.users.messages.list({
			// 	userId: "me",
			// 	q: `is:unread after:${formattedDate} before:${nextDate} ${labels
			// 		.map((label) => `label:${label}`)
			// 		.join(" OR ")} ${text.map((t) => `"${t}"`).join(" OR ")} ${emails
			// 		.map((email) => `from:${email}`)
			// 		.join(" OR ")}`,
			// });
			// const messageIds = messagesResponse.result.messages;
			const messageIds = response.result.messages;
			const filteredMessages = [];

			if (messageIds) {
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
						messageWithSender.delete = async () => {
							try {
								await gapi.client.gmail.users.messages.trash({
									userId: "me",
									id: messageId.id,
								});
								console.log("Deleted message with ID", messageId.id);
							} catch (error) {
								console.error(error);
							}
						};

						// Check if message matches any of the filter criteria
						const matchesLabel =
							labels.length > 0
								? labels.some((label) =>
										headers.some(
											(header) =>
												header.name === "Label" && header.value === label
										)
								  )
								: false;
						const matchesText =
							text.length > 0
								? text.some((t) => messageWithSender.snippet.includes(t))
								: false;
						const matchesEmail =
							emails.length > 0
								? emails.some(
										(email) => fromHeader && fromHeader.value.includes(email)
								  )
								: false;

						// Get the current date and time
						const currentDate = new Date();
						// Get the start of today in UTC
						const startOfToday = Date.UTC(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							currentDate.getDate()
						);
						// Get the end of today in UTC
						const endOfToday = Date.UTC(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							currentDate.getDate() + 1
						);
						// Get the timestamp of the message in UTC
						const messageDate = parseInt(messageWithSender.internalDate);
						// Check if the message is received today or not
						const matchesDate =
							messageDate >= startOfToday && messageDate < endOfToday;

						if (matchesLabel || matchesText || matchesEmail) {
							filteredMessages.push(messageWithSender);

							// filteredMessages.push({
							// 	message: messageWithSender,
							// 	read: false, // Flag indicating if message has been read
							// 	readMessage: async () => {
							// 		try {
							// 			// Mark message as read
							// 			await gapi.client.gmail.users.messages.modify({
							// 				userId: "me",
							// 				id: messageId.id,
							// 				removeLabelIds: ["UNREAD"],
							// 			});
							// 			console.log("Message marked as read.");
							// 			// Set read flag to true
							// 			filteredMessages.find(
							// 				(m) => m.message.id === messageId.id
							// 			).read = true;
							// 		} catch (error) {
							// 			console.error(error);
							// 		}
							// 	},
							// });
						}

						return messageWithSender;
					})
				);
				setFormMessages(messages);
			}
			// return filteredMessages;
			setFilteredMessages(filteredMessages);
		} catch (error) {
			console.error(error);
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
		FilteredMessages,
	};
};

export default useGmailApi;
