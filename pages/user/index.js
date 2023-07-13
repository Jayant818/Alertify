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
	const [number, setNumber] = useState("");
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
		allMessages,
		getAllMessages,
	} = useGmailApi(gapi);

	const handleClick = () => {
		handleSignOut();
		setIsAuthenticated(false);
		router.push("/");
	};

	console.log("Rerendered");

	const onClose = async () => {
		SetIsOpen(false);
		// await getAllMessages();
		// SendHello();
		// setTimeout(() => {
		// 	SendListOfMessages();
		// }, 5000);
	};

	const SendHello = async (mobileNumber) => {
		const res = await fetch("/api/hello", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, mobileNumber }),
		});
		const data = await res.json();
	};

	const onSubmit = async (mobileNumber) => {
		// await fetchMessages();
		// console.log("Name is ", name);
		setNumber(mobileNumber);
		SendHello(mobileNumber);
		// setTimeout(() => {
		SendListOfMessages(mobileNumber);
		// }, 5000);
	};

	const SendListOfMessages = async (mobileNumber) => {
		const res = await fetch("/api/send-list-messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ messages, allMessages, mobileNumber }),
		});
		const data = await res.json();
		console.log("The all messages", allMessages);
	};

	const [content, setContent] = useState("");

	// useEffect(() => {
	// 	console.log("Inside useEffect");
	// 	const interval = setInterval(() => {
	// 		fetch("./message.txt")
	// 			.then((res) => res.text())
	// 			.then((data) => console.log("data is ", data));
	// 	}, 10000);
	// 	return () => clearInterval(interval);
	// }, []);

	return (
		<div className="bg-[#0d0f19] text-white">
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
				SendListOfMessages={SendListOfMessages}
			/>
			<Footer />
		</div>
	);
}
