import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, useLocation } from "react-router-dom"
import { ClimbingBoxLoader, RingLoader } from "react-spinners"
import auth from "../../firebase.init"
import { css } from "@emotion/react"
// import { css } from "@emotion/react";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`

const RequireAuth = ({ children }) => {
	const location = useLocation()
	const [user, loadingUser] = useAuthState(auth)
	let [loading, setLoading] = useState(true)
	let [color, setColor] = useState("#ffffff")

	if (loadingUser) {
		return (
			<div className="sweet-loading w-screen min-h-[90vh] flex justify-center items-center">
				{/* <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" /> */}

				<ClimbingBoxLoader
					color={color}
					loading={loading}
					css={override}
					size={30}
					speedMultiplier={4}
				/>
			</div>
		)
	}

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />
	} else {
		return children
	}
}

export default RequireAuth
