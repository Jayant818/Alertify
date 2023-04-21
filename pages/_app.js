import "@/styles/globals.css";
import { AuthProvider } from "@/Components/authContext";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}
