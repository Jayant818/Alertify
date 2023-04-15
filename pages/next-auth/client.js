import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
	const [session, loading] = useSession();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!session) {
		return (
			<div>
				<button onClick={() => signIn("google")}>Sign in with Google</button>
			</div>
		);
	}

	return (
		<div>
			<p>Welcome, {session.user.email}!</p>
			<ul>
				{session.user.emails.map((email, index) => (
					<li key={index}>{email}</li>
				))}
			</ul>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	);
}
