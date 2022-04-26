import React from "react"
import { Link } from "react-router-dom"
import usePosts from "../hooks/usePosts"
import Post from "../Shared/Post"

const Home = () => {
	const posts = usePosts()
	return (
		<div className="min-h-screen">
			<div className=" w-[95%] md:w-2/4 grid mx-auto justify-items-center gap-6">
				<div className=" w-full grid">
					<Link
						className="bg-gray-200 dark:bg-gray-600 mt-8 py-4 rounded-md text-center"
						to="/new-post"
					>
						Create a new post
					</Link>
				</div>
				{
                    posts.map(post => <Post key={post._id} post={post}></Post>)
                }
			</div>
		</div>
	)
}

export default Home
