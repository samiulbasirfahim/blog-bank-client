import React from "react"
import { MdModeNight, MdOutlineWbSunny } from "react-icons/md"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../../firebase.init"
import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
const Header = ({ darkModeHandler, isDarkMode }) => {
	const [user] = useAuthState(auth)
	console.log(user)
	const today = new Date()
	const time = today.getHours() + ":" + today.getMinutes()
	const date =
		today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
	console.log(time, date)
	return (
		<div className="h-[8vh] sticky top-0 bg-gray-300 dark:bg-gray-600 shadow-blue-50 dark:shadow-gray-800 shadow-2xl">
			<header className="h-full px-2 flex items-center justify-between container mx-auto">
				<nav>
					<Link
						to={"/"}
						className="text-dark font-bold mr-6 dark:text-white"
					>
						Home
					</Link>
					<Link
						to={"/managePosts"}
						className="text-dark font-bold dark:text-white"
					>
						Manage posts
					</Link>
				</nav>
				<nav className="flex items-center">
					<button className="mr-6" onClick={darkModeHandler}>
						{isDarkMode ? (
							<p className="flex items-center font-bold text-white">
								<span className="hidden md:block">
									Night Mode
								</span>
								<MdModeNight></MdModeNight>
							</p>
						) : (
							<p className="flex items-center font-bold text-dark">
								<span className="hidden md:block">
									Day Mode
								</span>
								<MdOutlineWbSunny></MdOutlineWbSunny>
							</p>
						)}
					</button>
					{!user ? (
						<Link
							to="/login"
							className="text-dark font-bold dark:text-white"
						>
							Login
						</Link>
					) : (
						<button
							onClick={() => signOut(auth)}
							className="text-dark font-bold dark:text-white"
						>
							Logout
						</button>
					)}
				</nav>
			</header>
		</div>
	)
}

export default Header
