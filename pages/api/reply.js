import { MongoClient } from "mongodb";
import twilio from "twilio";

function removeSearchString(str) {
	if (str.includes("/search")) {
		return str.replace("/search", "");
	} else {
		return str;
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "4mb",
		},
	},
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { Body } = req.body;
		console.log("Called");

		const accountSid = "ACb7333e96b8280e72dc9290b7948ef033";
		const authToken = "75a88cdda1af737bde9ac600e9a411ae";
		const client2 = twilio(accountSid, authToken);

		let messageToSearch = "";
		let filteredResult = [];

		if (Body.includes("/search")) {
			const toSearch = removeSearchString(Body);

			messageToSearch = toSearch;
		} else {
			messageToSearch = `Invalid Response`;
		}

		let client1;
		try {
			client1 = await MongoClient.connect(
				"mongodb+srv://yadavjayant2003:ZMGyRxcXFOD1NI0r@cluster0.kzm1urt.mongodb.net/test?retryWrites=true&w=majority"
			);
		} catch (err) {
			console.log("Error");
			res.status(500).json({ message: "Can't Connect to the DB" });
			return;
		}
		console.log("Connected to database");

		try {
			const message = await client2.messages.create({
				body: `🔍 Searching...`,
				from: "whatsapp:+14155238886",
				to: "whatsapp:+919711177191",
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

			// Write the code To filter out all the message on the basis of the messageToSearch
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
					to: "whatsapp:+919711177191",
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
