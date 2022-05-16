import { useEffect, useState } from "react"

const usePosts = (d) => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("https://blog-post-fahim.herokuapp.com/posts")
			.then((response) => response.json())
			.then((data) => setPosts(data))
	}, [d])
	return {posts, setPosts}
}

export default usePosts
