import React from "react";

export default function UserTable({ messages }) {
	if (messages.length < 1) {
		return <></>;
	}

	return (
		<>
			<table className="table-auto w-full">
				<thead>
					<tr>
						<th className="px-4 py-2">#</th>
						<th className="px-4 py-2">Sender Name</th>
						<th className="px-4 py-2">Body</th>
						<th className="px-4 py-2">Marks as Read</th>
						<th className="px-4 py-2">Delete</th>
					</tr>
				</thead>
				<tbody>
					{messages.map((message, index) => (
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
									onChange={() => {
										message.markAsReadAndArchived();
									}}
								/>
							</td>
							<td className="border px-4 py-2">
								<input
									type="checkbox"
									onChange={() => {
										message.delete();
									}}
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
			</table>
		</>
	);
}
