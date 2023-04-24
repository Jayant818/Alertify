import twilio from "twilio";

export default async function handler(req, res) {
	const { senderEmail, body } = req.body;

	const accountSid = "ACb7333e96b8280e72dc9290b7948ef033";
	const authToken = "8338c191a539b1a43866cfc0d87b0fad";
	const client = twilio(accountSid, authToken);

	try {
		const message = await client.messages.create({
			body: `Received a Email from ${senderEmail} \n The Mails Says : ${body}`,
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
