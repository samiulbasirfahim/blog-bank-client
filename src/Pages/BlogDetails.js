import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HelmetTitle from "../Shared/HelmetTitle"

const BlogDetails = () => {
	const { postId } = useParams()
	const [post, setPost] = useState({})
	console.log(post)

	useEffect(() => {
		fetch("https://blog-post-server-143.herokuapp.com/post/" + postId)
			.then((response) => response.json())
			.then((data) => {
				setPost(data)
			})
	}, [postId])
	return (
		<div className="min-h-[90vh]">
			<HelmetTitle>{post?.postTitle}</HelmetTitle>
			<div class="flex max-w-xl my-10 bg-white shadow-md rounded-lg overflow-hidden mx-auto">
				<div class="flex items-center w-full">
					<div class="w-full">
						<div class="flex flex-row mt-2 px-2 py-3 mx-3">
							<div class="w-auto h-auto rounded-full border-2 border-pink-500">
								<img
									class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
									alt="User avatar"
									src="https://i.ibb.co/LtSrBZh/Parker96.webp"
								/>
							</div>
							<div class="flex flex-col mb-2 ml-4 mt-1">
								<div class="text-gray-600 text-sm font-semibold">
									{post.authorDisplayName}
								</div>
								<div class="flex w-full mt-1">
									<div class="text-blue-700 font-mono text-xs mr-1 cursor-pointer">
										{post.time}
									</div>
									<div class="text-gray-500 font-mono font-thin text-xs">
										• {post.date}
									</div>
								</div>
							</div>
						</div>
						<div class="border-b border-gray-100"></div>
						<div class="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
							<img
								class="rounded"
								src="https://i.ibb.co/THdW8zd/pexels-lucilene-silva-4069535.jpg"
								alt=""
							/>
						</div>
						<div class="text-gray-600 font-semibold text-lg mb-2 mx-3 px-2">
							{post.postTitle}
						</div>
						<div class="text-gray-500 font-thin text-sm mb-6 mx-3 px-2">
							{post.postBody}
						</div>
						<div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
							<img
								class="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
								alt="User avatar"
								src="https://i.ibb.co/LtSrBZh/Parker96.webp"
							/>
							<span class="absolute inset-y-0 right-0 flex items-center pr-6">
								<button
									type="submit"
									class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
								>
									<svg
										class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
							</span>
							<input
								type="search"
								class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
								style={{borderRadius: "25px"}}
								placeholder="Post a comment..."
								autocomplete="off"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogDetails
