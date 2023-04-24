import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "@/Components/authContext";
import Header from "@/Components/Header";
import { useRouter } from "next/router";
import useGmailApi from "@/helpers/gmail-api";
import Userdata from "@/Components/User/Userdata";
import Footer from "@/Components/Footer";

export default function User() {
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

	return (
		<div>
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
