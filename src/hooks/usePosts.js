import { useEffect, useState } from "react"

const usePosts = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("https://blog-post-fahim.herokuapp.com/posts")
			.then((response) => response.json())
			.then((data) => setPosts(data))
	}, [])
	return {posts, setPosts}
}

export default usePosts
