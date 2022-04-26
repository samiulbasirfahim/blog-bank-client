import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const createToken = (email, from) => {
	if (email) {
		fetch("https://blog-post-server-143.herokuapp.com/getToken", {
			body: JSON.stringify({ email: email }),
			headers: { "Content-Type": "application/json" },
			method: "post",
		})
			.then((res) => res.json())
			.then((data) => {
				localStorage.setItem("accessToken", data.token)
			})
	}
}

export default createToken
