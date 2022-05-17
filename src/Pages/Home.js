import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import usePosts from "../hooks/usePosts"
import Post from "../Shared/Post"
import { css } from "@emotion/react"
import { PacmanLoader } from "react-spinners"
import HelmetTitle from "../Shared/HelmetTitle"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase.init"
import { useQuery } from "react-query"
// import { css } from "@emotion/react";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`
const Home = () => {
	const [loading] = useState(true)
	const [user] = useAuthState(auth)
	const location = useLocation()
	const [color] = useState("#000")

	const {
		isLoading,
		error,
		data: posts,
	} = useQuery("repoData", () =>
		fetch("https://blog-post-fahim.herokuapp.com/posts").then((res) =>
			res.json()
		)
	)

	if (isLoading) {
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
			</div>
		)
	}
	return (
		<div className="min-h-screen">
			<HelmetTitle>Home</HelmetTitle>
			<div className=" w-[95%] md:w-2/4 grid mx-auto justify-items-center gap-6">
				<div className=" w-full grid">
					<Link
						state={{ from: location }}
						className="bg-white dark:bg-gray-600 mt-8 py-4 rounded-md text-center"
						to="/new-post"
					>
						Create a new post
					</Link>
				</div>
				{posts.map((post, index) => (
					<Post key={post._id} index={index} post={post}></Post>
				))}
			</div>
		</div>
	)
}

export default Home
