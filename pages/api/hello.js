import twilio from "twilio";

export default async function handler(req, res) {
	const { name, mobileNumber } = req.body;
	console.log("Name is ", name);

	const accountSid = process.env.ID;
	const authToken = process.env.TOKEN;
	const client = twilio(accountSid, authToken);
	process.env.MOBILE_NUMBER = mobileNumber;

	try {
		const message = await client.messages.create({
			body: `Hello ${name}, welcome to Alertify! 🎉\n\n📢 You have successfully signed up to receive email alerts on WhatsApp for free. You can now stay updated on the topics that matter to you without opening your inbox.\n\nTo start receiving alerts, please follow these steps:\n1️⃣ Save this number as Alertify in your contacts.\n2️⃣ Go to alertify.com and choose the email sources and keywords you want to get alerts for.\n3️⃣  Enjoy your alerts!\n\nIf you have any questions or feedback, please reply to this message or visit our help center at alertify.com/help.\n\nThank you for choosing Alertify! 😊`,
			from: "whatsapp:+14155238886",
			to: `whatsapp:+91${mobileNumber}`,
		});

		console.log(message.sid);
		res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to send message" });
	}
}
