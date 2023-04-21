import React from "react";

export default function UserMsg({ name, messages, fetchMessages }) {
	return (
		<div className="mx-auto">
			{messages.length > 1 && (
				<>
					<h1 className="text-2xl font-bold mb-4">Unread Messages</h1>
					<table className="table-auto w-full">
						<thead>
							<tr>
								<th className="px-4 py-2">#</th>
								<th className="px-4 py-2">Sender Name</th>
								<th className="px-4 py-2">Body</th>
							</tr>
						</thead>
						<tbody>
							{messages.map((message, index) => (
								<tr key={message.id}>
									<td className="border px-4 py-2">{index + 1}</td>
									<td className="border px-4 py-2">{message.senderName}</td>
									<td className="border px-4 py-2">{message.snippet}</td>
								</tr>
							))}
							{messages.length < 1 && (
								<tr>
									<td className="border px-4 py-2" colSpan="3">
										No messages found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
}
