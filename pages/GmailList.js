import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuthenticatedClient } from "@/Components/googleAuth";

export default function GmailList() {
	const router = useRouter();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		async function fetchData() {
			// Get the OAuth access token from the query string
			const { access_token } = router.query;

			// Use the access token to authenticate the Gmail API client
			const gmail = await getAuthenticatedClient(access_token);

			// Call the Gmail API to get the list of all messages
			const response = await gmail.users.messages.list({
				userId: "me",
			});

			// Extract the list of messages from the response
			const messageIds = response.data.messages.map((message) => message.id);

			// Set the state variable with the list of messages
			setMessages(messageIds);
		}

		if (router.query.access_token) {
			fetchData();
		}
	}, [router.query]);

	return (
		<div>
			<h1>List of Gmail messages</h1>
			<ul>
				{messages.map((messageId) => (
					<li key={messageId}>{messageId}</li>
				))}
			</ul>
		</div>
	);
}
