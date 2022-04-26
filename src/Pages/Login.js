import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useLocation, useNavigate } from "react-router-dom"
import auth from "../firebase.init"
import SocialLogin from "../Shared/SocialLogin/SocialLogin"
import createToken from "../Utils/utils"

const Login = () => {
	const [user] = useAuthState(auth)
	const location = useLocation()
	const navigate = useNavigate()
	const from = location?.state?.from || "/"
	useEffect(() => {
		if (user) {
			console.log(user);
			createToken(user.email)
			navigate(from)
		}
	},[user])
	return (
		<div className="min-h-[90vh] flex flex-col justify-center">
			<p className="mx-auto mb-8 text-4xl md:text-6xl text-black dark:text-white font-mono font-semibold">
				{" "}
				login{" "}
			</p>
			<form className="w-[95%] md:w-2/4 mx-auto bg-white dark:bg-gray-600 p-8 md:p-24 rounded-lg">
				<div className="mb-6">
					<div className="relative z-0">
						<input
							type="text"
							id="floating_standard"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
						/>
						<label
							for="floating_standard"
							className="absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Email
						</label>
					</div>
				</div>
				<div className="mb-6">
					<div className="relative z-0">
						<input
							type="text"
							id="floating_standard"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
						/>
						<label
							for="floating_standard"
							className="absolute text-sm text-gray-500 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Password
						</label>
					</div>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Login
				</button>
				<div className="mt-2">
					<Link to="/register" className="text-blue-800">
						Don't have an account?{" "}
					</Link>
				</div>
			</form>

			<div className="flex justify-center">
				<SocialLogin></SocialLogin>
			</div>
		</div>
	)
}

export default Login
