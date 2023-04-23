import React from "react";
// import hero from "./assets/hero.png"; // import the hero image
import hero from "../public/Images/hero.jpeg";

const HeroSection = ({ handleClick }) => {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			{/* main container with flexbox and height set to full screen */}
			<div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
				{/* inner container with responsive layout */}
				<div className="max-w-md">
					{/* text content container */}
					<div className="text-5xl font-bold text-gray-800">Alertify</div>
					{/* heading with large font size and bold weight */}
					<p className="text-2xl mb-8 leading-relaxed text-gray-600">
						Send email alerts on WhatsApp with ease
					</p>
					{/* description with medium font size and margin bottom */}
					<button
						onClick={handleClick}
						className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
					>
						Get started
					</button>
					{/* call to action button with indigo background and white text, added transition, duration, ease and transform properties for animation */}
				</div>
				<div className="max-w-lg md:mx-8">
					{/* image container with margin on medium screens */}
					<img
						className="w-full rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
						src="/Images/hero.jpeg"
						alt="Hero"
						style={{ height: "auto" }}
					/>
					{/* image element with responsive width and auto height, added transition, duration, ease and transform properties for animation */}
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
