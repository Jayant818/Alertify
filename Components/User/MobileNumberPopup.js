import { useState } from "react";

function MobileNumberPopup({ isOpen, onClose, onSubmit }) {
	const [mobileNumber, setMobileNumber] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(mobileNumber);
		onClose();
	};

	return (
		<div
			className={`${
				isOpen ? "" : "hidden"
			} fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75`}
		>
			<div className="bg-white rounded-lg p-6">
				<h2 className="text-lg font-bold mb-4">Enter your mobile number:</h2>
				<form onSubmit={handleSubmit}>
					<div className="flex items-center mb-4">
						<label htmlFor="mobileNumber" className="mr-2">
							+91
						</label>
						<input
							type="text"
							id="mobileNumber"
							name="mobileNumber"
							placeholder="1234567890"
							value={mobileNumber}
							onChange={(event) => setMobileNumber(event.target.value)}
							className="border rounded-lg py-2 px-3 flex-1"
							required
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="button"
							className="mr-2 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-lg text-sm font-bold uppercase"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-bold uppercase"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default MobileNumberPopup;
