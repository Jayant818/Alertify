import { useState } from "react";

export default function UserForm({ labels }) {
	const [label, setLabel] = useState("");
	const [searchText, setSearchText] = useState("");

	const handleLabelChange = (event) => {
		setLabel(event.target.value);
	};

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you can write your logic for handling the form submit
	};

	console.log("Labels ", labels);

	return (
		<form onSubmit={handleSubmit} className="p-4 bg-gray-100">
			<label htmlFor="label" className="block font-bold mb-2">
				Choose a label:
			</label>
			<select
				id="label"
				name="label"
				value={label}
				onChange={handleLabelChange}
				className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
			>
				<option value="">Select a label</option>
				<option value="inbox">Inbox</option>
				<option value="sent">Sent</option>
				<option value="drafts">Drafts</option>
			</select>

			<label htmlFor="searchText" className="block font-bold mt-4 mb-2">
				Enter search text:
			</label>
			<textarea
				id="searchText"
				name="searchText"
				value={searchText}
				onChange={handleSearchTextChange}
				className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
				rows="4"
			></textarea>

			<button
				type="submit"
				className="block mt-4 mx-auto px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
			>
				Search
			</button>
		</form>
	);
}
