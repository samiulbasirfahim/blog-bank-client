import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useJwt from "../hooks/useJwt"

const EditPost = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const from = location?.state?.from || '/'
	const { postId } = useParams()
	const [post, setPost] = useState({})
	const { jwtToken } = useJwt()
	useEffect(() => {
		fetch("http://localhost:5000/post/" + postId)
			.then((response) => response.json())
			.then((data) => {
				setPost(data)
			})
	}, [postId])
	useEffect(() => {
		if (post?._id) {
			delete post._id
		}
	}, [post])
	const handleUpdate = (event) => {
		event.preventDefault()
		console.log(post)
		const postBody = {
			...post,
			postTitle: event.target.title.value,
			postBody: event.target.post.value,
		}
		fetch("http://localhost:5000/updatePost/" + postId, {
			headers: {
				"content-type": "application/json",
				authorization: "bearer " + jwtToken,
			},
			body: JSON.stringify({ postBody }),
			method: "put",
		})
			.then((response) => response.json())
			.then((data) => {console.log(data)
			if(data.modifiedCount === 1){
				navigate(from)
			}})
	}
	return (
		<div className="h-[90vh] flex justify-center items-center">
			<form className="w-[95%] md:w-2/4 mx-auto" onSubmit={handleUpdate}>
				<p className="mx-auto mb-8 text-4xl md:text-6xl text-black dark:text-white font-mono font-semibold">
					Edit {post?.postTitle?.slice(0, 10)}...
				</p>
				<div className="mb-6">
					<label
						htmlFor="base-input"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Post Title
					</label>
					<input
						placeholder="Title"
						type="text"
						defaultValue={post.postTitle}
						id="base-input"
						name="title"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="message"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
					>
						Post
					</label>
					<textarea
						required
						id="message"
						name="post"
						rows="4"
						defaultValue={post.postBody}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="post"
					></textarea>
				</div>
				<button
					type="submit"
					className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/2 mx-auto block mt-6 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Update post
				</button>
			</form>
		</div>
	)
}

export default EditPost
