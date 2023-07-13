import twilio from "twilio";

export default async function handler(req, res) {
	const { senderEmail, body } = req.body;

	const accountSid = process.env.ID;
	const authToken = process.env.TOKEN;
	const client = twilio(accountSid, authToken);

	try {
		const message = await client.messages.create({
			body: `📧 Received a Email from ${senderEmail}\n💬The Mails Says : ${body}`,
			from: "whatsapp:+14155238886",
			to: `whatsapp:+91${process.env.MOBILE_NUMBER}`,
		});

		console.log(message.sid);
		res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to send message" });
	}
}
