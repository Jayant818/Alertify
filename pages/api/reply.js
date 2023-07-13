import { MongoClient } from "mongodb";
import twilio from "twilio";

function removeSearchString(str) {
	if (str.includes("/search")) {
		return str.replace("/search ", "");
	} else {
		return str;
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "8mb",
		},
	},
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { Body } = req.body;
		console.log("Called");

		const accountSid = process.env.ID;
		const authToken = process.env.TOKEN;

		const client2 = twilio(accountSid, authToken);

		let messageToSearch = "";
		let filteredResult = [];

		if (Body.includes("/search")) {
			const toSearch = removeSearchString(Body);

			messageToSearch = toSearch;
			console.log("Message", messageToSearch);
		} else {
			messageToSearch = `Invalid Response`;
			return;
		}

		let client1;
		try {
			client1 = await MongoClient.connect(
				"mongodb+srv://yadavjayant2003:ZMGyRxcXFOD1NI0r@cluster0.kzm1urt.mongodb.net/test?retryWrites=true&w=majority"
			);
		} catch (err) {
			console.log("Error");
			res.status(500).json({ message: "Can't Connect to the DB" });
		}
		console.log("Connected to database");

		try {
			const message = await client2.messages.create({
				body: `🔍 Searching...`,
				from: "whatsapp:+14155238886",
				to: `whatsapp:+91${process.env.MOBILE_NUMBER}`,
			});

			// console.log(message.sid);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Failed to send message" });
			return;
		}

		try {
			const db = client1.db();
			const collection = db.collection("SearchQuery");

			const queryResult = await collection.find().toArray();
			// console.log("queryResult is ", queryResult[0].messages);

			filteredResult = queryResult[0].messages.filter((msg) => {
				const snippet = msg.snippet.toLowerCase();
				const senderName = msg.senderName.toLowerCase();
				return (
					snippet.includes(messageToSearch.toLowerCase()) ||
					senderName.includes(messageToSearch.toLowerCase())
				);
				// msg.snippet.toLowerCase().includes(messageToSearch.toLowerCase())
			});
			console.log("filteredResult is ", filteredResult);

			client1.close();
		} catch (err) {
			console.log("Error");
			res.status(500).json({ message: "Can't Connect to the DB" });
			return;
		}

		if (filteredResult) {
			try {
				let messageBody = "🔍 Search Results are in! 🔎:\n\n";
				filteredResult.forEach((message, index) => {
					messageBody += `📧 From: ${message.senderName}\n💬 Message: ${message.snippet}🚀💼 \n\n`;
				});
				const message = await client2.messages.create({
					body: messageBody,
					from: "whatsapp:+14155238886",
					to: `whatsapp:+91${process.env.MOBILE_NUMBER}`,
				});

				// console.log(message.sid);
				res.status(200).json("Hello");
			} catch (error) {
				console.error(error);
				res.status(500).json({ message: "Failed to send message" });
				return;
			}
		}
	}
}
