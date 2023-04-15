import { useState } from "react";
import { useSession } from "next-auth/react";
import gmailApi from "react-gmail";

export default function HeroSection() {
	const { messages, setMessages } = useState();
	const { data: session } = useSession();
	const getMessages = () => {
		gmailApi.getMessages(true, 5).then((res) => {
			setMessages(gmailApi.normalizeData(res));
		});
	};
	return (
		<>
			{session ? (
				<>
					<button onCLick={getMessages}>Get Messages</button>
					<ul>
						{messages.map((message) => (
							<li key="message.id">
								<div>
									<span>
										{message.subject}: {message.snippet}
									</span>
									<p>{message.date}</p>
								</div>
							</li>
						))}
					</ul>
				</>
			) : (
				" "
			)}
		</>
	);
}
