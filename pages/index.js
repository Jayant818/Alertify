// import Header from "@/Components/Header";
// import HeroSection from "@/Components/HeroSection";
import React from "react";
import GmailReact from "@/Components/gmail-react";

const CLIENT_ID =
	"221500998934-87vjhu49ecjabr76iqil2og9hsf83978.apps.googleusercontent.com";
const API_KEY = "AIzaSyBKVZxzARtmzIvBYg21Ie15SNoJJn6HMq0";

export default function Home() {
	return (
		<div>
			{/* <Header />
			<HeroSection /> */}
			<h1>Gmail API in React JS</h1>
			<GmailReact clientId={CLIENT_ID} apiKey={API_KEY} />
		</div>
	);
}
