import { useEffect, useState } from "react";

export default function Header({ name, handleClick }) {
	return (
		<div className="flex justify-between ml-4 mt-2 mr-4 items-center">
			<p className="text-2xl uppercase text-red-800 text cursor-pointer font-medium leading-10 tracking-wider">
				Alertify
			</p>
			<button
				onClick={() => handleClick()}
				className="px-4 py-2 text-white bg-blue-500 cursor-pointer rounded-lg hover:shadow-lg hover:bg-blue-800"
			>
				{name}
			</button>
			{/* ) : ( */}
		</div>
	);
}
