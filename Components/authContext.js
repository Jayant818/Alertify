import { createContext, useState, useEffect, useMemo } from "react";
import useGoogleAuth from "../helpers/google-auth";

const AuthContext = createContext();

const clientId =
	"221500998934-87vjhu49ecjabr76iqil2og9hsf83978.apps.googleusercontent.com";
const apiKey = "AIzaSyBKVZxzARtmzIvBYg21Ie15SNoJJn6HMq0";

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [gapi, setGapi] = useState();

	useEffect(() => {
		import("gapi-cjs").then((gapi) => {
			setGapi(gapi.default.gapi);
		});
	}, []);

	const {
		isSignedIn,
		isInitialized,
		error: authError,
		handleSignIn,
		handleSignOut,
	} = useGoogleAuth(clientId, apiKey, gapi);

	useEffect(() => {
		if (isSignedIn) {
			setIsAuthenticated(true);
			console.log("Happening too many times");
		}
	}, [isSignedIn]);

	const contextValue = useMemo(
		() => ({
			isAuthenticated,
			handleSignIn,
			handleSignOut,
			gapi,
			setIsAuthenticated,
		}),
		[isAuthenticated, handleSignIn, handleSignOut, gapi]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
