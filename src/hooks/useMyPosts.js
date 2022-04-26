import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase.init"
import useJwt from "./useJwt"

const useMyposts = () => {
	const [user] = useAuthState(auth)
	const [posts, setPosts] = useState([])
	const { jwtToken } = useJwt()
	useEffect(() => {
		if (jwtToken && user?.email) {
			fetch("https://blog-post-server-143.herokuapp.com/userPost", {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					authorization: "bearer " + jwtToken,
					email : user?.email
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setPosts(data)
				})
		}
	}, [jwtToken, user])
	return posts
}

export default useMyposts
