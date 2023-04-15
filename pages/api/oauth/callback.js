import {
	getAccessToken,
	getAuthenticatedClient,
} from "@/Components/googleAuth";

export default async (req, res) => {
	const { code } = req.query;
	const tokens = await getAccessToken(code);
	const gmail = await getAuthenticatedClient(tokens);
	res.redirect("/"); // Redirect to your app's homepage
};
