import { sendPasswordResetEmail } from "firebase/auth"
import React from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import auth from "../firebase.init"
import HelmetTitle from "../Shared/HelmetTitle"

const SendResetPassMail = () => {
	const hadnleResetEmail = (event) => {
		event.preventDefault()
		const email = event.target.email.value
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.success(
					`password reset email sent successfully,
									 `
				)
			})
			.catch((error) => {
				// console.log(error.code)
				if (error.code === "auth/invalid-email") {
					toast.error("Invalid email address")
				} else if (error.code === "auth/user-not-found") {
					toast.error("User not found")
				}
			})
	}
	return (
		<div className="min-h-[90vh] flex flex-col justify-center">
			<HelmetTitle>Reset Email</HelmetTitle>
			<p className="mx-auto mb-8 text-4xl md:text-6xl text-black dark:text-white font-mono font-semibold">
				{" "}
				Reset Password{" "}
			</p>
			<form
				onSubmit={hadnleResetEmail}
				className="w-[95%] md:w-2/4 mx-auto bg-white dark:bg-gray-600 p-8 md:p-24 rounded-lg"
			>
				<p className="dark:text-gray-100 text-gray-600">
					If you do not see the email in a few minutes, check your
					“junk mail” folder or “spam” folder. We make every effort to
					ensure that these emails are delivered.
				</p>
				<div className="mb-6">
					<div className="relative z-0">
						<input
							type="email"
							id="floating_standard"
							name="email"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							autoComplete="off"
						/>
						<label
							htmlFor="floating_standard"
							className="absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Email
						</label>
					</div>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Reset password
				</button>
				<div className="flex justify-between w-full">
					<div className="mt-2">
						<Link
							to="/register"
							className="text-blue-800 dark:text-green-600"
						>
							Don't have an account?{" "}
						</Link>
					</div>
					<div className="mt-2">
						<Link
							to="/login"
							className="text-blue-800 dark:text-green-600"
						>
							Back to login{" "}
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default SendResetPassMail
