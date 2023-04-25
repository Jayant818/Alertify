import twilio from "twilio";

export default async function handler(req, res) {
	const { name } = req.body;
	console.log("Name is ", name);

	const accountSid = "ACb7333e96b8280e72dc9290b7948ef033";
	const authToken = "1051a9bc8ff1a4baed0cc319a5da1319";
	const client = twilio(accountSid, authToken);

	try {
		const message = await client.messages.create({
			body: `Hello ${name}, welcome to Alertify! 🎉\n\n
      You have successfully signed up to receive email alerts on WhatsApp for free. You can now stay updated on the topics that matter to you without opening your inbox.\n\n
      To start receiving alerts, please follow these steps:\n
      1. Save this number as Alertify in your contacts.\n
      2. Go to alertify.com and choose the email sources and keywords you want to get alerts for.\n
      3. Enjoy your alerts!\n\n
      If you have any questions or feedback, please reply to this message or visit our help center at alertify.com/help.\n\n
      Thank you for choosing Alertify! 😊`,
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
