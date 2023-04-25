import { useState } from "react";

function SearchMessages({ searchMessages }) {
	const [query, setQuery] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const handleInputChange = (event) => {
		setQuery(event.target.value);
	};

	const handleSearch = async (event) => {
		event.preventDefault();
		const result = await searchMessages(query);
		setSearchResult(result);
	};

	const handleMarkAsRead = async (message) => {
		message.markAsReadAndArchived();
		message.isMarkedAsRead = true;
	};

	const handleDelete = async (message) => {
		await message.delete();
		setSearchResult((prevState) =>
			prevState.filter((prevMessage) => prevMessage.id !== message.id)
		);
	};

	return (
		<div className="bg-white  p-8 mb-4">
			<form onSubmit={handleSearch} className="space-y-4">
				<div className="flex flex-col space-y-">
					<label className="text-blue-800 font-bold" htmlFor="query">
						{" "}
						Search Query{" "}
					</label>
					<div className="">
						<input
							className="border border-blue-300 rounded-lg w-full py-2 px-3 text-blue-700 leading-tight focus:ring-blue-500 focus:border-blue-500 placeholder-blue-400"
							id="query"
							type="text"
							value={query}
							onChange={handleInputChange}
							placeholder="Search for messages…"
						/>
						<div className=" inset-y-0 right-0 pr-3 flex items-center">
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:ring-blue-300 focus:ring-offset-white focus:ring-offset-2 focus:ring-2"
								type="submit"
							>
								{" "}
								Search{" "}
							</button>
						</div>
					</div>
				</div>
			</form>

			<ul className="mt-6 space-y-4">
				{searchResult.map((message) => (
					<li key={message.id} className="bg-red-100 p-6 rounded-lg">
						<div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
							<div className="flex flex-col space-y-1">
								<strong className="text-lg text-blue-800">
									{message.senderName}
								</strong>
								<p className="text-blue-600">{message.snippet}</p>
							</div>
							<div className="flex space-x-4">
								<button
									className={`${
										message.isMarkedAsRead
											? "bg-gray-300 cursor-not-allowed"
											: "bg-blue-500 hover:bg-blue-700 text-white"
									} py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue`}
									onClick={() => handleMarkAsRead(message)}
									disabled={message.isMarkedAsRead}
								>
									{message.isMarkedAsRead ? "Marked as Read" : "Mark as Read"}
								</button>
								<button
									className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
									onClick={() => handleDelete(message)}
								>
									Delete
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchMessages;
