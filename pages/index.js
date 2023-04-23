import { useContext } from "react";
import { AuthContext } from "@/Components/authContext";
import Header from "@/Components/Header";
import HeroSection from "@/Components/HeroSection";
import Image from "next/image";
import { useRouter } from "next/router";
import FeaturesSection from "@/Components/FeaturesSection";
import Footer from "@/Components/Footer";

const CLIENT_ID =
	"221500998934-87vjhu49ecjabr76iqil2og9hsf83978.apps.googleusercontent.com";
const API_KEY = "AIzaSyBKVZxzARtmzIvBYg21Ie15SNoJJn6HMq0";

export default function Home() {
	const { isAuthenticated, handleSignIn } = useContext(AuthContext);
	const router = useRouter();

	if (isAuthenticated) {
		router.push("/user");
	}

	return (
		<>
			<Header name="Sign In" handleClick={handleSignIn} />
			{/* <div className="mt-3 bg-slate-800 w-[95%] ml-4 h-1/3 rounded-2xl relative overflow-hidden">
				<Image
					src="/images/hero-image.jpg"
					alt="Person checking Gmail alerts on phone via WhatsApp"
					layout="fill"
					objectFit="cover"
				/>
			</div> */}
			<HeroSection handleClick={handleSignIn} />
			<FeaturesSection />
			<Footer />
		</>
	);
}
