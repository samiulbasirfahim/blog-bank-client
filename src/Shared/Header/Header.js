import React from "react"
import { MdModeNight, MdOutlineWbSunny, MdAccountBox, MdLogin, MdLogout } from "react-icons/md"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../../firebase.init"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
const Header = ({ darkModeHandler, isDarkMode }) => {
	const [user] = useAuthState(auth)
	const location = useLocation()
	const navigate = useNavigate()
	console.log(location.pathname.split("/")[1])
	return (
		<div className="h-[8vh] sticky z-50 top-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-blue-200 dark:shadow-gray-700 shadow-2xl">
			<header className="h-full px-2 flex items-center justify-between container mx-auto">
				{location.pathname.split("/")[1] === "post" ? (
					<button
						onClick={() => navigate(-1)}
						className="text-dark font-bold mr-6  px-8 rounded-md py-2 border  dark:text-white"
					>
						Back
					</button>
				) : (
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
				)}
				<nav className="flex items-center">
					<button className="mr-6" onClick={darkModeHandler}>
						{isDarkMode ? (
							<p className="flex items-center font-bold text-white">
								<span className="hidden md:block px-2">
									Night Mode
								</span>
								<MdModeNight></MdModeNight>
							</p>
						) : (
							<p className="flex items-center font-bold text-dark">
								<span className="hidden md:block px-2">
									Day Mode
								</span>
								<MdOutlineWbSunny></MdOutlineWbSunny>
							</p>
						)}
					</button>
					<span className="mr-6">
						{user && <Link to="/profile" className="flex items-center font-bold text-dark dark:text-white">
								<span className="hidden md:block px-2">
									Profile
								</span>
								<MdAccountBox></MdAccountBox>
							</Link>}
					</span>
					{!user ? (
						<Link
							to="/login"
							className="text-dark font-bold dark:text-white"
						>
							<span className="md:block hidden">Login</span>
							<MdLogin></MdLogin>
						</Link>
					) : (
						<button
							onClick={() => signOut(auth)}
							className="text-dark font-bold flex items-center dark:text-white"
						>
							<span className="md:block hidden px-2">log out</span>
							<MdLogout></MdLogout>
						</button>
					)}
				</nav>
			</header>
		</div>
	)
}

export default Header
