import twilio from "twilio";
import { MongoClient } from "mongodb";

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};

export default async function handler(req, res) {
	const { messages, allMessages, mobileNumber } = req.body;
	console.log("messages", messages);

	let client;
	try {
		client = await MongoClient.connect(
			"mongodb+srv://yadavjayant2003:ZMGyRxcXFOD1NI0r@cluster0.kzm1urt.mongodb.net/test?retryWrites=true&w=majority"
		);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Error connecting to the database" });
		return;
	}

	// console.log("Connected to database");

	try {
		const db = client.db();
		const collection = db.collection("SearchQuery");
		const insertResult = await collection.insertOne({ messages: allMessages });
		console.log("Inserted documents =>", insertResult);
		// res.status(501).json({ data: "Not legimate" });
		client.close();
	} catch (err) {}

	try {
		const accountSid = process.env.ID;
		const authToken = process.env.TOKEN;
		const client2 = twilio(accountSid, authToken);

		let messageBody = "You have unread messages:\n\n";
		messages.forEach((message, index) => {
			messageBody += `📰 From: ${message.senderName}\n🔑 Subject: ${message.subject}\n📖 Message: ${message.snippet}\n\n`;
		});

		const message = await client2.messages.create({
			body: messageBody,
			from: "whatsapp:+14155238886",
			to: `whatsapp:+91${mobileNumber}`,
		});

		res.status(200).json({ message: "Message sent successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to send message" });
	}
}
