import twilio from "twilio";
// import useGmailApi from "@/helpers/gmail-api";
import io from "socket.io";

function removeSearchString(str) {
	// check if the input string contains "/search"
	if (str.includes("/search")) {
		// remove "/search" from the input string and return the new string
		return str.replace("/search", "");
	} else {
		// if the input string doesn't contain "/search", return the original string
		return str;
	}
}

// const { searchMessages } = useGmailApi();

// const SearchMsg = async (toSearch) => {
// 	const result = await searchMessages(toSearch);
// 	return result;
// };

const server = io.listen(8000);

export default async function handler(req, res) {
	const { Body } = req.body;
	console.log("Called");

	let messageToSend = "";

	if (Body.includes("/search")) {
		const toSearch = removeSearchString(Body);
		// Generate the formatted message here
		const formattedMessage = toSearch;

		// Send the formatted message to the client using Socket.io
		server.emit("formattedMessage", formattedMessage);

		// Send the response to Twilio
		res.status(200).json({ message: formattedMessage });
	} else {
		messageToSend = `Invalid Response`;
		res.status(500).json({ message: messageToSend });
	}
}
