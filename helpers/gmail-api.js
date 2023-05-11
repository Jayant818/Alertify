// gmail-react.js

// A package that allows developers to use Gmail API in React JS

// Import React and Google API client library
import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useContext,
} from "react";
// import { AuthContext } from "@/Components/authContext";

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
	const [allMessages, setAllMessages] = useState([]);

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
			console.log("Fetching the new Messages");
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
					const subjectHeader = headers.find(
						(header) => header.name === "Subject"
					);
					const subject = subjectHeader ? subjectHeader.value : "No Subject";
					const messageWithSender = { ...response.result, senderName, subject };
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

			// iterate through each message and check if it matches any of the conditions
			messages.forEach((message) => {
				const labelIds = message.labelIds;
				const body = message.snippet;
				const senderEmail = message.payload.headers
					.find((header) => header.name === "From")
					?.value.match(/<([^>]+)>/)?.[1];
				if (
					labelIds.some((label) => labelsArray.includes(label)) ||
					textArray.some((text) => body.includes(text)) ||
					emailsArray.includes(senderEmail)
				) {
					message.color = "red";
				}
			});
			console.log(messages);
			setMessages(messages);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

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

	const searchMessages = async (query) => {
		if (!gapi) return [];
		// setLoading(true);
		try {
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: query,
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
			// setLoading(false);
			return messages;
		} catch (error) {
			setError(error);
			// setLoading(false);
			return [];
		}
	};

	const checkNewMessages = async () => {
		// console.log("Hi");
		if (!gapi) return;
		// console.log("Hello");

		try {
			console.log("Checking for new Message");
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: "is:unread",
				maxResults: 1,
			});
			const latestMessageId = response.result.messages[0].id;

			if (messages.length === 0 || latestMessageId !== messages[0].id) {
				console.log("New Message Found");
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
				// const isLabelMatched = labelIds.some((label) =>
				// 	labelsArray.includes(label)
				// );
				const isLabelMatched = label
					? labelIds.some((label) => labelsArray.includes(label))
					: false;
				console.log("Label matched", isLabelMatched);

				// check if the sender of the new message is in the emailsArray state
				const senderEmail = fromHeader
					? fromHeader.value.match(/<([^>]+)>/)[1]
					: null;
				console.log("Email ", senderEmail);

				const isSenderMatched = senderEmail
					? emailsArray.includes(senderEmail)
					: false;
				console.log("Sender  matched", isSenderMatched);

				// check if the body of the new message contains any text from the textArray state
				const body = newMessage.snippet;
				console.log("Body", body);
				const isTextMatched = textArray.some((text) => body.includes(text));

				console.log("text  matched", isTextMatched);
				// console.log("text length", text.length);
				// console.log(senderEmail.length);
				// console.log(.length);
				// set the color property to red if any of the conditions are true
				console.log("Hello ", ...labelsArray, ...emailsArray, ...textArray);
				if (
					isLabelMatched ||
					isSenderMatched ||
					isTextMatched ||
					(labelsArray.length == 0 &&
						emailsArray.length == 0 &&
						textArray.length == 0)
				) {
					newMessage.color = "red";
					console.log("Found");
					const res = await fetch("/api/send-message", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ senderEmail, body }),
					});
					const data = await res.json();

					setMessages((prevMessages) => [newMessage, ...prevMessages]);
				}
			}
		} catch (error) {
			setError(error);
		}
	};

	const fetchTop10Messages = async () => {
		if (!gapi) return;
		setLoading(true);
		try {
			console.log("Fetching the new Messages");
			const response = await gapi.client.gmail.users.messages.list({
				userId: "me",
				q: "is:unread",
				maxResults: 50, // set maxResults to 10 for top 10 messages
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

			setAllMessages(messages);

			//   setMessages(messages.slice(0, 10)); // set messages to top 10 messages
			//   setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		let intervalId;
		if (gapi && gapi.auth2.getAuthInstance().isSignedIn.get()) {
			// fetchLabels();
			// fetchMessages();
			intervalId = setInterval(() => {
				checkNewMessages();
			}, 90000);
			const user = gapi.auth2.getAuthInstance().currentUser.get();
			setName(user.getBasicProfile().getName());
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [messages]);

	useEffect(() => {
		const fetchData = () => {
			console.log("Calling");
			fetchLabels();
			fetchMessages();
			fetchTop10Messages();
			if (gapi && gapi.auth2.getAuthInstance().isSignedIn.get()) {
			} else {
				setTimeout(fetchData, 90000); // retry after 1 second
			}
		};

		fetchData();
	}, []);

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
		fetchLabels,
		searchMessages,
		allMessages,
	};
};

export default useGmailApi;
