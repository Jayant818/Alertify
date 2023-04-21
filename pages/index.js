import { useContext, useState } from "react";
import { AuthContext } from "@/Components/authContext";
import Header from "@/Components/Header";
import { useRouter } from "next/router";

const CLIENT_ID =
	"221500998934-87vjhu49ecjabr76iqil2og9hsf83978.apps.googleusercontent.com";
const API_KEY = "AIzaSyBKVZxzARtmzIvBYg21Ie15SNoJJn6HMq0";

export default function Home() {
	const { isAuthenticated, handleSignIn, handleSignOut } =
		useContext(AuthContext);

	const router = useRouter();

	if (isAuthenticated) {
		router.push("/user");
	}
	return (
		<>
			<Header name="Sign In" handleClick={handleSignIn} />
			<hr className="mt-3 bg-slate-800 w-[95%] ml-4 h-1/3  " />
		</>
	);
}
