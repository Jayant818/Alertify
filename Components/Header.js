import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export default function Header() {
	// A state variable to store the labels
	const [labels, setLabels] = useState([]);
	const [error, setError] = useState("");

	// A useEffect hook to fetch the labels when the component mounts
	useEffect(() => {
		// A function to fetch the labels using axios
		async function fetchLabels() {
			try {
				// Make a GET request to the /api/gmail API route
				const response = await axios.get("/api/gmail");

				// Check if the response is successful
				if (response.status === 200) {
					// Set the labels state with the data from the response
					setLabels(response.data.labels);
				} else {
					// Throw an error with the status code
					throw new Error(`Request failed with status code ${response.status}`);
				}
			} catch (error) {
				// Set the error state with the error message
				setError(error.message);
			}
		}

		// Call the fetchLabels function
		fetchLabels();
	}, []);
	console.log("Labels", labels);
	console.log("Errors", error);
	const { data: session } = useSession();
	return (
		<div className="flex justify-between ml-4 mt-2 mr-4 items-center">
			<p className="text-2xl uppercase text-red-800 text cursor-pointer font-bold ">
				Alertify
			</p>
			{!session ? (
				<button
					onClick={() => signIn()}
					className="px-4 py-2 text-white bg-blue-500 cursor-pointer rounded-lg hover:shadow-lg hover:bg-blue-800"
				>
					Sign In
				</button>
			) : (
				<>
					<p>Hi ,{session.user.name} 👋</p>
					<button onClick={() => signOut()}>Sign out</button>
				</>
			)}
		</div>
	);
}
