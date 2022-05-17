import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase.init"

const useLoadNotifications = () => {
	const [user] = useAuthState(auth)
	const [notifications, setNotifications] = useState()
	useEffect(() => {
		fetch("https://blog-post-fahim.herokuapp.com/notification/" + user?.email)
			.then((res) => res.json())
			.then((data) => setNotifications(data))
	}, [user])
	return [notifications, setNotifications]
}

export default useLoadNotifications
