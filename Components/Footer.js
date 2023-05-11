import React from "react";

const Footer = () => {
	return (
		<footer className="flex flex-col items-center justify-center bg-[#151720] font text-white p-5">
			{/* <img
				className="w-24 h-auto mb-2"
				src="/Images/logo.png"
				alt="Alertify logo"
			/> */}
			<p className="text-2xl uppercase text-red-800 text cursor-pointer font-medium leading-5 tracking-wider mb-2">
				Alertify
			</p>
			<nav className="flex flex-wrap gap-2">
				<a className="text-white hover:text-green-400" href="#">
					Home
				</a>
				<a className="text-white hover:text-green-400" href="#">
					About
				</a>
				<a className="text-white hover:text-green-400" href="#">
					Contact
				</a>
			</nav>
			<p className="mt-2">© Alertify. All rights reserved.</p>
		</footer>
	);
};

export default Footer;
