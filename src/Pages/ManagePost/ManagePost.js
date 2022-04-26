import React from "react"
import { Link } from "react-router-dom"

const ManagePost = () => {
	return (
		<div>
			<div className=" w-[95%] md:w-2/4 grid mx-auto">
				<Link
					className="bg-gray-200 dark:bg-gray-600 mt-8 py-4 rounded-md text-center"
					to="/new-post"
				>
					Create a new post
				</Link>
			</div>
		</div>
	)
}

export default ManagePost
