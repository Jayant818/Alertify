import React from "react";
import UserMsg from "./UserMsg";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import SearchMessages from "./UserSearch";

export default function Userdata({
	name,
	messages,
	fetchMessages,
	labels,
	fetchFormMessages,
	setMessages,
	FormMessages,
	fetchLabels,
	searchMessages,
	SendListOfMessages,
}) {
	const handleClick = () => {
		fetchMessages();
		fetchLabels();
		// SendListOfMessages();
	};
	return (
		<div className="mb-16 mt-10">
			<SearchMessages searchMessages={searchMessages} />
			<div>
				<p className="text-center text-2xl mb-4">Hello 👋 {name}</p>
				<button
					className="block mx-auto mb-4  btn2"
					onClick={handleClick}
					// onClick={() => fetchMessages()}
				>
					Fetch New Messages
				</button>
			</div>
			<div className="flex gap-2 mb-4">
				<div className="w-1/2">
					<UserMsg
						name={name}
						messages={messages}
						fetchMessages={fetchMessages}
						FormMessages={FormMessages}
					/>
				</div>
				<div className="w-1/2">
					<UserForm
						labels={labels}
						fetchFormMessages={fetchFormMessages}
						setMessages={setMessages}
						FormMessages={FormMessages}
						fetchMessages={fetchMessages}
					/>
					<UserTable messages={FormMessages} />
				</div>
			</div>
		</div>
	);
}
