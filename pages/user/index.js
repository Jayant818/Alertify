import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/Components/authContext";
import Header from "@/Components/Header";
import { useRouter } from "next/router";
import useGmailApi from "@/helpers/gmail-api";
import Userdata from "@/Components/User/Userdata";
import Footer from "@/Components/Footer";
import MobileNumberPopup from "@/Components/User/MobileNumberPopup";

export default function User() {
	const [isOpen, SetIsOpen] = useState(true);
	const [Name, setName] = useState("");
	const {
		isAuthenticated,
		handleSignIn,
		handleSignOut,
		setIsAuthenticated,
		gapi,
	} = useContext(AuthContext);

	const router = useRouter();

	const {
		messages,
		loading,
		error: apiError,
		fetchMessages,
		name,
		labels,
		fetchFormMessages,
		FormMessages,
		setMessages,
		FilteredMessages,
		fetchLabels,
		searchMessages,
	} = useGmailApi(gapi);

	const handleClick = () => {
		handleSignOut();
		setIsAuthenticated(false);
		router.push("/");
	};

	console.log("Rerendered");

	const onClose = () => {
		SetIsOpen(false);
		SendHello();
		setTimeout(() => {
			SendListOfMessages();
		}, 5000);
	};

	const SendHello = async () => {
		const res = await fetch("/api/hello", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name }),
		});
		const data = await res.json();
	};

	const onSubmit = async (mobileNumber) => {
		// await fetchMessages();
		// console.log("Name is ", name);
	};

	const SendListOfMessages = async () => {
		const res = await fetch("/api/send-list-messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ messages }),
		});
		const data = await res.json();
	};

	return (
		<div>
			<MobileNumberPopup
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={onSubmit}
			/>

			<Header name="Sign Out" handleClick={handleClick} />
			{/* <p>Hello, 👋 {name}</p> */}
			<Userdata
				name={name}
				messages={messages}
				fetchMessages={fetchMessages}
				labels={labels}
				fetchFormMessages={fetchFormMessages}
				FormMessages={FilteredMessages}
				setMessages={setMessages}
				fetchLabels={fetchLabels}
				searchMessages={searchMessages}
			/>
			<Footer />
		</div>
	);
}
