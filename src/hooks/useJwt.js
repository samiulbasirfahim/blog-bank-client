import { useEffect, useState } from "react"

const useJwt = () => {
	const [jwtToken, setJwtToken] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem("accessToken")
		if (token) {
			setJwtToken(token)
		}
	}, [])
    return {jwtToken}
}

export default useJwt
