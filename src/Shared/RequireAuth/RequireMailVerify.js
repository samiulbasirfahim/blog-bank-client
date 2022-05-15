import { sendEmailVerification } from "firebase/auth"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import toast from "react-hot-toast"
import auth from "../../firebase.init"

const RequireMailVerify = ({ children }) => {
	const [user] = useAuthState(auth)
	const handleSendEmailVerification = () => {
		sendEmailVerification(auth.currentUser)
			.then(() => {
				toast.success("Email verification send")
			})
			.catch((error) => {
				toast.error("something went wrong, 	please try again")
			})
	}
	console.log(user)
	if (!user?.emailVerified) {
		return (
			<div className="min-h-screen flex justify-center items-center ">
				<div className="mx-6 p-4 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
					<img
						className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
						src="https://i.ibb.co/S7G6G4P/kate-stone-matheson-uy5t-CJu-IK4-unsplash.jpg"
						alt=""
					/>
					<button
						onClick={handleSendEmailVerification}
						className="flex flex-col justify-between p-4 leading-normal"
					>
						<h5 className="mb-2 text-xl text-center w-full font-bold tracking-tight text-gray-900 dark:text-white">
							You should verify your email address before post
							something
						</h5>
						<p className="mb-3 font-normal text-center w-full text-gray-700 dark:text-gray-400">
							send email verification again
							<br />
							If you do not see the email in a few minutes, check
							your “junk mail” folder or “spam” folder. We make
							every effort to ensure that these emails are
							delivered.
							<br />
							{user?.email?.slice(0, 6)}.......
							{user?.email?.slice(
								user?.email?.length - 12,
								user.email?.length
							)}
						</p>
					</button>
				</div>
			</div>
		)
	} else {
		return children
	}
}

export default RequireMailVerify
