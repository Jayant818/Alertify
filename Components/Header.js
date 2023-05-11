import { useEffect, useState } from "react";

export default function Header({ name, handleClick }) {
	return (
		<div className="flex justify-between bg-gray-900  items-center p-4">
			<p className="text-3xl uppercase text-white text cursor-pointer font-bold leading-10 tracking-wider">
				Alertify
			</p>
			<button
				onClick={() => handleClick()}
				className="px-4 py-2 text-white text-xl font-medium bg-transparent border-2 border-[#303fe1] cursor-pointer rounded-lg hover:shadow-lg hover:bg-[#303fe1]"
			>
				{name}
			</button>
			{/* ) : ( */}
		</div>
	);
}
