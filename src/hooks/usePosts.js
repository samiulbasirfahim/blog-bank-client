import { useEffect, useState } from "react"

const usePosts = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("http://localhost:5000/posts")
			.then((response) => response.json())
			.then((data) => setPosts(data))
	}, [])
	return posts
}

export default usePosts
