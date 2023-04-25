import twilio from "twilio";

export default async function handler(req, res) {
	const { messages } = req.body;

	const accountSid = "ACb7333e96b8280e72dc9290b7948ef033";
	const authToken = "1051a9bc8ff1a4baed0cc319a5da1319";
	const client = twilio(accountSid, authToken);

	try {
		let messageBody = "You have unread messages:\n\n";
		messages.forEach((message, index) => {
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
		res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to send message" });
	}
}
