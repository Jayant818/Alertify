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
			className="p-4 bg-[#0d0f19] rounded-lg shadow-md text-white"
		>
			<div className="mb-4">
				<label htmlFor="label" className="block font-bold mb-2 text-white">
					Choose a label:
				</label>
				<select
					id="label"
					name="label"
					value={SelectedLabel}
					onChange={handleLabelChange}
					className="block w-full h-full px-4 py-1 mt-2 bg-[#0d0f19] border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
				<label htmlFor="searchText" className="block font-bold mb-2 text-white">
					Enter search text:
				</label>
				<textarea
					id="searchText"
					name="searchText"
					value={searchText}
					onChange={handleSearchTextChange}
					className="w-full px-4 py-2 text-white bg-[#0d0f19] border border-gray-400 rounded shadow-md focus:outline-none focus:shadow-outline-blue focus:border-blue-500 resize-none"
					rows="4"
				></textarea>
			</div>

			<div className="mb-4">
				<label htmlFor="searchMail" className="block font-bold mb-2 text-white">
					Enter Mail:
				</label>
				<textarea
					id="searchMail"
					name="searchMail"
					value={searchMail}
					onChange={handleSearchMailChange}
					className="w-full px-4 py-2 text-white bg-[#0d0f19] border border-gray-400 rounded shadow-md focus:outline-none focus:shadow-outline-blue focus:border-blue-500 resize-none"
					rows="4"
				></textarea>
			</div>

			<button type="submit" className="block btn2">
				Search
			</button>
		</form>
	);
}
