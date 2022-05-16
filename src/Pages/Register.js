import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import toast from "react-hot-toast"
import { Link, useLocation, useNavigate } from "react-router-dom"
import auth from "../firebase.init"
import HelmetTitle from "../Shared/HelmetTitle"
import SocialLogin from "../Shared/SocialLogin/SocialLogin"
import createToken from "../Utils/utils"

const Register = () => {
	const [user] = useAuthState(auth)
	const location = useLocation()
	const navigate = useNavigate()
	const from = location?.state?.from || "/"
	useEffect(() => {
		if (user) {
			createToken(user.email)
			navigate(from)
		}
	}, [user])
	const registerSubmit = (event) => {
		event.preventDefault()
		const email = event.target.email.value
		const password = event.target.password.value
		const repeat_password = event.target.repeat_password.value
		const first_name = event.target.first_name.value
		const last_name = event.target.last_name.value

		if (password !== repeat_password) {
			toast.error("Password mismatch")
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (user) => {
					await updateProfile(auth.currentUser, {
						displayName: first_name + " " + last_name,
					})
					toast.success("Register successful")
				})
				.catch((error) => {
					if (error.code === "auth/email-already-in-use") {
						toast.error("Email already in use")
						event.target.reset()
					} else if (error.code === "auth/weak-password") {
						toast.error("Your password is so weak")
					} else {
						toast.error("something went wrong")
					}
				})
		}
	}
	return (
		<div className="min-h-[90vh] flex flex-col justify-center">
			<HelmetTitle>Register</HelmetTitle>
			<p className="mx-auto mb-8 text-4xl md:text-6xl text-black dark:text-white font-mono font-semibold">
				{" "}
				Register{" "}
			</p>
			<form
				onSubmit={registerSubmit}
				className="w-[95%] md:w-2/4 mx-auto bg-white dark:bg-gray-600 p-8 md:p-24 rounded-lg"
			>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="email"
						name="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
						autoComplete="off"
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Email address
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="password"
						name="password"
						id="password"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Password
					</label>
				</div>
				<div className="relative z-0 w-full mb-6 group">
					<input
						type="password"
						name="repeat_password"
						id="repeat_password"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="repeat_password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						Confirm password
					</label>
				</div>
				<div className="grid xl:grid-cols-2 xl:gap-6">
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="first_name"
							id="first_name"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
							autoComplete="off"
						/>
						<label
							htmlFor="first_name"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							First name
						</label>
					</div>
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="last_name"
							id="last_name"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-green-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
							autoComplete="off"
						/>
						<label
							htmlFor="last_name"
							className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Last name
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Register
				</button>
				<div className="mt-2">
					<Link
						to="/login"
						className="text-blue-800 dark:text-green-600"
					>
						Already have an account?{" "}
					</Link>
				</div>
			</form>
			<div className="flex justify-center">
				<SocialLogin></SocialLogin>
			</div>
		</div>
	)
}

export default Register
