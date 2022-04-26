import React from "react"
import {
	useSignInWithGithub,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth"
import auth from "../../firebase.init"

const SocialLogin = () => {
	const [googleSignIn] = useSignInWithGoogle(auth)
	const [githubSignIn] = useSignInWithGithub(auth)
	return (
		<div className="w-[95%] md:w-2/4 grid">
			<button
				className="bg-gray-200 dark:bg-gray-600 mt-8 py-4 rounded-md "
				onClick={() => googleSignIn()}
			>
				Continue with google
			</button>
			<button
				className="bg-gray-200 dark:bg-gray-600 mt-8 py-4 rounded-md "
				onClick={() => githubSignIn()}
			>
				Continue with github
			</button>
		</div>
	)
}

export default SocialLogin
