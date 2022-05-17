import { signOut } from "firebase/auth"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import auth from "../firebase.init"
import HelmetTitle from "../Shared/HelmetTitle"

const BlogDetails = () => {
	const { postId } = useParams()
	const [post, setPost] = useState({})
	const [user] = useAuthState(auth)
	const navigate = useNavigate()

	const [comments, setComments] = useState([])

	useEffect(() => {
		fetch("https://blog-post-fahim.herokuapp.com/post/" + postId)
			.then((response) => response.json())
			.then((data) => {
				setPost(data)
			})
	}, [postId])
	useEffect(() => {
		fetch("https://blog-post-fahim.herokuapp.com/comment/" + post._id)
			.then((res) => res.json())
			.then((data) => setComments(data))
	}, [post])

	const handleComment = (event) => {
		event.preventDefault()
		const comment = event.target.comment.value
		const userEmail = user.email
		const userName = user.displayName
		const postId = post._id
		const time = moment().format("MMMM Do YYYY, h:mm:ss a")
		const commentBody = {
			comment,
			userEmail,
			userName,
			postId,
			time,
		}
		fetch("https://blog-post-fahim.herokuapp.com/comment/", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: "Bearer " + localStorage.getItem("accessToken"),
				email: userEmail,
			},
			body: JSON.stringify(commentBody),
		})
			.then((response) => {
				if (response.status === 401 || response.status === 403) {
					signOut(auth)
					navigate("/login")
				}
				return response.json()
			})
			.then((data) => {
				setComments([commentBody, ...comments])
				event.target.reset()
			})
	}

	return (
		<div className="min-h-[90vh]">
			<HelmetTitle>{post?.postTitle}</HelmetTitle>
			<div
				data-aos="fade-down"
				data-aos-delay={300}
				className="flex max-w-xl my-10 bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mx-auto"
			>
				<div className="flex items-center w-full">
					<div className="w-full">
						<div>
							<div className="flex flex-row mt-2 px-2 py-3 mx-3">
								<div className="w-auto h-auto rounded-full border-2 border-pink-500">
									<img
										className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
										alt="User avatar"
										src="https://i.ibb.co/LtSrBZh/Parker96.webp"
									/>
								</div>
								<div className="flex flex-col justify-center mb-2 ml-4 mt-1">
									<div className="text-gray-600 text-sm font-semibold">
										{post.authorDisplayName}
									</div>
									<div className="flex w-full  mt-1"></div>
								</div>
							</div>
							<div className="flex flex-col justify-center w-full items-center">
								<div className="text-gray-900 dark:text-slate-400 font-mono font-thin text-xs">
									{post.date}
								</div>
								{post.editDate && (
									<div className="text-gray-500 font-mono font-thin text-xs">
										Edited ({post.editDate})
									</div>
								)}
							</div>
						</div>
						<div className="border-b border-gray-100"></div>
						<div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
							{post.image && (
								<img
									className="rounded"
									src={post.image}
									alt=""
								/>
							)}
						</div>
						<div className="text-gray-600 font-semibold text-lg mb-2 mx-3 px-2">
							{post.postTitle}
						</div>
						<div className="text-gray-600 dark:text-gray-400 text-sm mb-6 mx-3 px-2">
							{post.postBody}
						</div>
						{user ? (
							<form
								onSubmit={handleComment}
								className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
							>
								<img
									className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
									alt="User avatar"
									src="https://i.ibb.co/LtSrBZh/Parker96.webp"
								/>
								<span className="absolute inset-y-0 right-0 flex items-center pr-6">
									<button
										type="submit"
										className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M17 8l4 4m0 0l-4 4m4-4H3"
											/>
										</svg>
									</button>
								</span>
								<input
									type="search"
									name="comment"
									className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
									style={{ borderRadius: "25px" }}
									placeholder="Post a comment..."
									autocomplete="off"
									required
								/>
							</form>
						) : (
							<div>
								<p className="text-gray-500 text-center">
									You must logged in for make a comment
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="grid justify-items-center">
				{comments.map((comment, index) => (
					<div
						key={index}
						data-aos="fade-down"
						data-aos-delay={50 * index}
						className="px-4 py-1 mb-4 bg-gray-100 rounded-lg dark:bg-gray-600 lg:w-[576px] w-full"
					>
						<div className="flex items-center flex-col">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
								/>
							</svg>
							<h3 className="text-lg text-gray-800 dark:text-gray-200 font-bold">
								{comment.userName}
							</h3>
							<div className="text-gray-900 font-mono font-thin text-xs">
								{comment.time}
							</div>
						</div>
						<div className="mt-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
							{comment.comment}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default BlogDetails
