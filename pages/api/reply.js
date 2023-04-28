import { Search } from "@/Components/User/UserSearch";

function removeSearchString(str) {
	if (str.includes("/search")) {
		return str.replace("/search", "");
	} else {
		return str;
	}
}

export default async function handler(req, res) {
	const { Body } = req.body;
	console.log("Called");

	let messageToSend = "";

	if (Body.includes("/search")) {
		const toSearch = removeSearchString(Body);

		messageToSend = toSearch;
	} else {
		messageToSend = `Invalid Response`;
	}
	console.log("Message to Search ", messageToSend);

	// Pass the searchMessages function to the Alertify component as props
	// const alertifyHandler = Search();
	const alertifyHandler = Search({ messageToSend });
	res.status(200).json({ message: messageToSend });

	// Call the handler function returned by the Alertify component
	// await alertifyHandler(req, res);
}

// import twilio from "twilio";
// import useGmailApi from "@/helpers/gmail-api";

// // There is a Problem the searchMessage uses Gapi which is not applicable at the client side it is available at the Client Side when user sign In
// const { searchMessages } = useGmailApi();

// const SearchMsg = async (toSearch) => {
// 	const result = await searchMessages(toSearch);
// 	return result;
// };

// export default async function handler(req, res) {
// 	const { Body } = req.body;
// 	console.log("Called");

// 	const accountSid = "ACb7333e96b8280e72dc9290b7948ef033";
// 	const authToken = "1051a9bc8ff1a4baed0cc319a5da1319";
// 	const client = twilio(accountSid, authToken);

// 	try {
// 		const message = await client.messages.create({
// 			body: messageToSend,
// 			from: "whatsapp:+14155238886",
// 			to: "whatsapp:+919711177191",
// 		});

// 		console.log(message.sid);
// 		res.status(200).json({ message: messageToSend });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Failed to send message" });
// 	}
// }
