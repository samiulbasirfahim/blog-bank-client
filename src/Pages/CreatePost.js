import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import toast from "react-hot-toast"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import auth from "../firebase.init"
import useJwt from "../hooks/useJwt"

const CreatePost = () => {
	const [user] = useAuthState(auth)
	const { jwtToken } = useJwt()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location?.state?.from || '/'
	const today = new Date()
	const time = today.getHours() + ":" + today.getMinutes()
	const date =
		today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
	// console.log(time, date)
	const handleSubmit = (event) => {
		event.preventDefault()
		const postBody = event.target.post.value
		const postTitle = event.target.title.value
		if (!user.email || !jwtToken) {
			return (
				<Navigate state={{ from: location }} to={"/login"}></Navigate>
			)
		}

		fetch("https://blog-post-server-143.herokuapp.com/post", {
			body: JSON.stringify({
				postBody: postBody,
				postTitle: postTitle,
				author: user.email,
				authorDisplayName: user.displayName,
				time: time,
				date: date,
				image:''
			}),
			headers: {
				"Content-Type": "application/json",
				authorization: "bearer " + jwtToken,
			},
			method: "post",
		})
			.then((response) => response.json())
			.then((data) => {
				toast.success("Posted successfully")
				navigate(from)
			})
			.catch(() => toast.error("something went wrong"))
	}
	return (
		<div className="h-[90vh] flex justify-center items-center">
			<form className="w-[95%] md:w-2/4 mx-auto" onSubmit={handleSubmit}>
				<p className="mx-auto mb-8 text-4xl md:text-6xl text-black dark:text-white font-mono font-semibold">
					Create a new post
				</p>
				<div className="mb-6">
					<label
						for="base-input"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Post Title
					</label>
					<input
						placeholder="Title"
						type="text"
						id="base-input"
						name="title"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div>
					<label
						for="message"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Post
					</label>
					<textarea
						required
						id="message"
						name="post"
						rows="4"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="post"
					></textarea>
				</div>
				<button
					type="submit"
					className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/2 mx-auto block mt-6 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Post
				</button>
			</form>
		</div>
	)
}

export default CreatePost
