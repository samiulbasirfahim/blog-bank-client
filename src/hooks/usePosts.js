import { useEffect, useState } from "react"

const usePosts = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("https://blog-post-server-143.herokuapp.com/posts")
			.then((response) => response.json())
			.then((data) => setPosts(data))
	}, [])
	return posts
}

export default usePosts
