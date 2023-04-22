import React from "react";
import UserMsg from "./UserMsg";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

export default function Userdata({
	name,
	messages,
	fetchMessages,
	labels,
	fetchFormMessages,
	setMessages,
	FormMessages,
}) {
	// console.log()
	return (
		<>
			<div>
				<p className="text-center text-2xl mb-4">Hello 👋 {name}</p>
				<button
					className="block mx-auto mb-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-300 ease-in-out"
					onClick={fetchMessages}
				>
					Fetch New Messages
				</button>
			</div>
			<div className="flex gap-2">
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
					/>
					<UserTable messages={FormMessages} />
				</div>
			</div>
		</>
	);
}