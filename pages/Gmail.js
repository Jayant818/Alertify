import { useRouter } from "next/router";
import GmailAuth from "./GmailAuth";
import GmailList from "./GmailList";

export default function Gmail() {
	const router = useRouter();

	if (!router.query.access_token) {
		// If the access token is not present in the query string, redirect to the authentication page
		return <GmailAuth />;
	}

	// If the access token is present in the query string, show the list of messages
	return <GmailList />;
}
