import twilio from "twilio";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Components/authContext";
import useGmailApi from "@/helpers/gmail-api";

export default function Search({ messageToSend }) {
	const { gapi } = useContext(AuthContext);

	const { searchMessages } = useGmailApi(gapi);

	const searchMsg = async (toSearch) => {
		const result = await searchMessages(toSearch);
		const accountSid = "ACb7333e96b8280e72dc9290b7948ef033";
		const authToken = "1051a9bc8ff1a4baed0cc319a5da1319";
		const client = twilio(accountSid, authToken);

		try {
			let messageBody = "";
			result.forEach((message, index) => {
				messageBody += `${index + 1}. From: ${message.senderName}, Subject: ${
					message.subject
				}, Message: ${message.snippet}\n\n`;
			});

			const message = await client.messages.create({
				body: messageBody,
				from: "whatsapp:+14155238886",
				to: "whatsapp:+919711177191",
			});

			console.log(message.sid);
		} catch (error) {
			console.error(error);
		}
	};

	return <div>{messageToSend && searchMsg()}</div>;
}
