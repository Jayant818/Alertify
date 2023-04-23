import React from "react";
// import { AuthContext } from "@/Components/authContext";
// import { useContext, useState } from "react";
import UserTable from "./UserTable";

export default function UserMsg({
	name,
	messages,
	fetchMessages,
	FormMessages,
}) {
	return (
		<div className="mx-auto">
			{messages.length > 1 && (
				<>
					<h1 className="text-2xl font-bold mb-4">Unread Messages</h1>
					<UserTable messages={messages} />
				</>
			)}
		</div>
	);
}
