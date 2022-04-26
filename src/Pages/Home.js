import React, { useState } from "react"
import { Link } from "react-router-dom"
import usePosts from "../hooks/usePosts"
import Post from "../Shared/Post"
import { css } from "@emotion/react"
import { PacmanLoader } from "react-spinners"
// import { css } from "@emotion/react";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`
const Home = () => {
	const [loading] = useState(true)
	const [color, setColor] = useState("#000")
	const {posts} = usePosts()
	if(posts.length === 0) {
		 return (
			<div className="sweet-loading w-screen min-h-[90vh] flex justify-center items-center">
				{/* <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" /> */}

				<PacmanLoader
					color={color}
					loading={loading}
					css={override}
					size={30}
					speedMultiplier={4}
				/>
			</div>)
	}
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
