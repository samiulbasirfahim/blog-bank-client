import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {  useNavigate } from "react-router-dom"
import auth from "../firebase.init"
import useJwt from "./useJwt"

const useMyposts = () => {
	const navigate = useNavigate()
	const [user] = useAuthState(auth)
	const [posts, setPosts] = useState([])
	const { jwtToken } = useJwt()
	useEffect(() => {
		if (jwtToken && user?.email) {
			fetch("https://blog-post-fahim.herokuapp.com/userPost", {
				method: "get",
				headers: {
					"Content-Type": "application/json",
					authorization: "bearer " + jwtToken,
					email : user?.email
				},
			})
				.then((response) =>{
					if(response.status === 401 || response.status === 403){
						signOut(auth)
						navigate('/login')
					}
					return response.json()})
				.then((data) => {
					setPosts(data)
				})
		}
	}, [jwtToken, user])
	return {posts, setPosts}
}

export default useMyposts
