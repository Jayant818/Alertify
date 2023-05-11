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
			<div className="bg-[#0d0f19] rounded-lg p-6">
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
							className="border rounded-lg py-2 px-3 flex-1 text-black"
							required
						/>
					</div>
					<div className="flex justify-end">
						<button type="button" className="btn2 mr-2" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className=" btn2">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default MobileNumberPopup;
