import React from "react"
import { Link, useLocation } from "react-router-dom"
import useJwt from "../../hooks/useJwt"
import useMyposts from "../../hooks/useMyPosts"
import HelmetTitle from "../../Shared/HelmetTitle"
import Post from "../../Shared/Post"

const ManagePost = () => {
	const location = useLocation()
	const { jwtToken } = useJwt()
	const { posts, setPosts } = useMyposts()
	const manageDeletePosts = (id) => {
		const confirmDelete = window.confirm(
			"are you sure to delete this post?"
		)
		if (confirmDelete) {
			fetch(
				"https://blog-post-fahim.herokuapp.com/deletePost/" + id,
				{
					headers: {
						"content-type": "application/json",
						authorization: "Bearer " + jwtToken,
					},

					method: "delete",
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.deleteCount !== 0) {
						const remaining = posts.filter(
							(post) => post._id !== id
						)
						setPosts(remaining)
					}
				})
		}
	}

	return (
		<div className="min-h-[90vh]">
			<div className=" w-[95%] md:w-2/4 grid mx-auto justify-items-center gap-6">
				<HelmetTitle>Manage post</HelmetTitle>
				<div className=" w-full grid">
					<Link
						state={{ from: location }}
						className="bg-white dark:bg-gray-600 mt-8 py-4 rounded-md text-center"
						to="/new-post"
					>
						Create a new post
					</Link>
				</div>
				{posts.length === 0 && (
					<p className="text-gray-600 font-semibold dark:text-gray-100">
						You dont have any posts
					</p>
				)}
				{posts.map((post) => (
					<Post key={post._id} post={post}>
						<Link
							state={{ from: location }}
							to={`/post-edit/${post._id}`}
							className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Edit
						</Link>
						<button
							onClick={() => manageDeletePosts(post._id)}
							className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Delete
						</button>
					</Post>
				))}
			</div>
		</div>
	)
}

export default ManagePost
