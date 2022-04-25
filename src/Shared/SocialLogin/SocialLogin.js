import React from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import auth from "../../firebase.init"

const SocialLogin = () => {
    const [googleSignIn] = useSignInWithGoogle(auth)
	return (
		<div>
			<button onClick={()=>googleSignIn()}>Continue with google</button>
			<button>Continue with github</button>
		</div>
	)
}

export default SocialLogin
