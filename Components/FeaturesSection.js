import React from "react";

export default function FeaturesSection() {
	return (
		<>
			<div className="container mx-auto px-5 py-10">
				{/* main container with margin, padding and width */}
				<div className="text-4xl font-bold text-gray-800 text-center mb-8">
					Features
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* grid container with responsive columns and gap */}
					<div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:scale-110 transition">
						{/* feature card with flexbox, center alignment, white background, shadow, padding and rounded corners */}
						<img
							className="w-32 h-32 mb-4"
							src="/Images/f1.jpg"
							alt="Real-time notifications"
						/>
						{/* feature image with width, height and margin bottom */}
						<div className="text-xl font-medium text-gray-800 mb-2">
							{/* feature title with medium font size, medium weight, gray color and margin bottom */}
							Real-time notifications
						</div>
						<p className="text-gray-600 text-center">
							{/* feature description with gray color and center alignment */}
							Receive notifications on WhatsApp as soon as you get new Gmail
							messages.
						</p>
					</div>
					<div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:scale-110 transition">
						{/* feature card with flexbox, center alignment, white background, shadow, padding and rounded corners */}
						<img
							className="w-32 h-32 mb-4"
							src="/Images/f2.jpg"
							alt="Customizable filters"
						/>
						{/* feature image with width, height and margin bottom */}
						<div className="text-xl font-medium text-gray-800 mb-2">
							{/* feature title with medium font size, medium weight, gray color and margin bottom */}
							Customizable filters
						</div>
						<p className="text-gray-600 text-center">
							{/* feature description with gray color and center alignment */}
							Set up filters to only receive notifications for specific types of
							emails.
						</p>
					</div>
					<div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:scale-110 transition">
						{/* feature card with flexbox, center alignment, white background, shadow, padding and rounded corners */}
						<img
							className="w-32 h-32 mb-4"
							src="/Images/f3.jpg"
							alt="Quick actions"
						/>
						{/* feature image with width, height and margin bottom */}
						<div className="text-xl font-medium text-gray-800 mb-2">
							{/* feature title with medium font size, medium weight, gray color and margin bottom */}
							Quick actions
						</div>
						<p className="text-gray-600 text-center">
							{/* feature description with gray color and center alignment */}
							Mark an email as read, archive it, or delete it directly from
							WhatsApp.
						</p>
					</div>
					<div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:scale-110 transition">
						{/* feature card with flexbox, center alignment, white background, shadow, padding and rounded corners */}
						<img
							className="w-32 h-32 mb-4"
							src="/Images/f4.jpg"
							alt="Message previews"
						/>
						{/* feature image with width, height and margin bottom */}
						<div className="text-xl font-medium text-gray-800 mb-2">
							{/* feature title with medium font size, medium weight, gray color and margin bottom */}
							Message previews
						</div>
						<p className="text-gray-600 text-center">
							{/* feature description with gray color and center alignment */}
							See a preview of the email message in the WhatsApp notification.
						</p>
					</div>
					<div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:scale-110 transition">
						{/* feature card with flexbox, center alignment, white background, shadow, padding and rounded corners */}
						<img
							className="w-32 h-32 mb-4"
							src="/Images/f5.jpg"
							alt="Search functionality"
						/>
						{/* feature image with width, height and margin bottom */}
						<div className="text-xl font-medium text-gray-800 mb-2">
							{/* feature title with medium font size, medium weight, gray color and margin bottom */}
							Search functionality
						</div>
						<p className="text-gray-600 text-center">
							{/* feature description with gray color and center alignment */}
							Search your Gmail inbox directly from WhatsApp with simple
							commands.
						</p>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
}
