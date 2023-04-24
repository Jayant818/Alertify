import { useState } from "react";

export default function UserForm({
	labels,
	fetchFormMessages,
	setMessages,
	FormMessages,
	fetchMessages,
}) {
	const [SelectedLabel, setSelectedLabel] = useState([]);
	const [searchText, setSearchText] = useState([]);
	const [searchMail, setSearchMail] = useState([]);

	const handleLabelChange = (event) => {
		const selectedOptions = Array.from(event.target.selectedOptions);
		const selectedValues = selectedOptions.map((option) => option.value);
		setSelectedLabel(selectedValues);
	};

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value.split(","));
	};
	const handleSearchMailChange = (event) => {
		setSearchMail(event.target.value.split(","));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Here you can write your logic for handling the form submit
		fetchFormMessages(SelectedLabel, searchText, searchMail);
		console.log("Also Calling th fetchMessages");
		setTimeout(() => {
			fetchMessages();
		}, 20000);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 bg-gray-100 rounded-lg shadow-md"
		>
			<div className="mb-4">
				<label htmlFor="label" className="block font-bold mb-2 text-gray-700">
					Choose a label:
				</label>
				<select
					id="label"
					name="label"
					value={SelectedLabel}
					onChange={handleLabelChange}
					className="block w-full h-full px-4 py-1 mt-2 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					multiple={true}
				>
					<option value="">Select a label</option>
					{labels.map((label) => (
						<option key={label.id} value={label.id}>
							{label.name}
						</option>
					))}
				</select>
			</div>

			<div className="mb-4">
				<label
					htmlFor="searchText"
					className="block font-bold mb-2 text-gray-700"
				>
					Enter search text:
				</label>
				<textarea
					id="searchText"
					name="searchText"
					value={searchText}
					onChange={handleSearchTextChange}
					className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded shadow-md focus:outline-none focus:shadow-outline-blue focus:border-blue-500 resize-none"
					rows="4"
				></textarea>
			</div>

			<div className="mb-4">
				<label
					htmlFor="searchMail"
					className="block font-bold mb-2 text-gray-700"
				>
					Enter Mail:
				</label>
				<textarea
					id="searchMail"
					name="searchMail"
					value={searchMail}
					onChange={handleSearchMailChange}
					className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded shadow-md focus:outline-none focus:shadow-outline-blue focus:border-blue-500 resize-none"
					rows="4"
				></textarea>
			</div>

			<button
				type="submit"
				className="block px-4 py-2 mx-auto rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
			>
				Search
			</button>
		</form>
	);
}
