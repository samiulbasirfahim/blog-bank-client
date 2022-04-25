import React from "react"
import { MdModeNight, MdOutlineWbSunny } from "react-icons/md"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../../firebase.init"
import { Link } from "react-router-dom"
const Header = ({ darkModeHandler, isDarkMode }) => {
	const [user] = useAuthState(auth)
	return (
		<div className="h-[8vh] bg-gray-300 dark:bg-gray-600 ">
			<header className="h-full flex items-center justify-between container mx-auto">
				<nav>
					<Link
						to={"/"}
						className="text-dark font-bold dark:text-white"
					>
						Home
					</Link>
				</nav>
				<nav>
					<button className="mx-6" onClick={darkModeHandler}>
						{isDarkMode ? (
							<p className="flex items-center font-bold text-white">
								Night Mode<MdModeNight></MdModeNight>
							</p>
						) : (
							<p className="flex items-center font-bold text-dark">
								Day Mode<MdOutlineWbSunny></MdOutlineWbSunny>
							</p>
						)}
					</button>
					{user || (
						<Link
							to="/login"
							className="text-dark font-bold dark:text-white"
						>
							Login
						</Link>
					)}
				</nav>
			</header>
		</div>
	)
}

export default Header
