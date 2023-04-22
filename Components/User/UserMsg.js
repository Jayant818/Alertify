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

					{/* <table className="table-auto w-full">
						<thead>
							<tr>
								<th className="px-4 py-2">#</th>
								<th className="px-4 py-2">Sender Name</th>
								<th className="px-4 py-2">Body</th>
								<th className="px-4 py-2">Marks as Read</th>
							</tr>
						</thead>
						<tbody>
							{FormMessages.map((message, index) => (
								<tr
									key={message.id}
									className={message.color == "red" ? "bg-red-500" : " "}
								>
									<td className="border px-4 py-2">{index + 1}</td>
									<td className="border px-4 py-2">{message.senderName}</td>
									<td className="border px-4 py-2">{message.snippet}</td>
									<td className="border px-4 py-2">
										<input
											type="checkbox"
											onChange={() => message.markAsReadAndArchived(message.id)}
										/>
									</td>
								</tr>
							))}
							{messages.map((message, index) => (
								<tr key={message.id}>
									<td className="border px-4 py-2">{index + 1}</td>
									<td className="border px-4 py-2">{message.senderName}</td>
									<td className="border px-4 py-2">{message.snippet}</td>
									<td className="border px-4 py-2">
										<input
											type="checkbox"
											onChange={() => message.markAsReadAndArchived(message.id)}
										/>
									</td>
								</tr>
							))}
							{messages.length < 1 && (
								<tr>
									<td className="border px-4 py-2" colSpan="4">
										No messages found.
									</td>
								</tr>
							)}
						</tbody>
					</table> */}
				</>
			)}
		</div>
	);
}
