import useGmailApi from "@/helpers/gmail-api";
import { useContext } from "react";
import { AuthContext } from "@/Components/authContext";
import Header from "@/Components/Header";
import HeroSection from "@/Components/HeroSection";
import Image from "next/image";
import { useRouter } from "next/router";
import FeaturesSection from "@/Components/FeaturesSection";
import Footer from "@/Components/Footer";

export default function Search({ messageToSend }) {
	console.log(messageToSend);
	const { gapi } = useContext(AuthContext);

	const { searchMessages } = useGmailApi(gapi);

	// useEffect(() => {
	if (messageToSend) {
		console.log("Got the result");
	}
	// }, []);

	return <div>Hello There</div>;
}
