import { getAuthUrl } from "@/Components/googleAuth";

export default function GmailAuth() {
	const authUrl = getAuthUrl();

	return (
		<div>
			<h1>Authenticate with Gmail</h1>
			<p>
				Click the button below to authenticate with Gmail and view a list of all
				messages in your inbox.
			</p>
			<a href={authUrl}>
				<button>Authenticate with Gmail</button>
			</a>
		</div>
	);
}
