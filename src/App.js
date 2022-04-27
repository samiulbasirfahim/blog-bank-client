import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import useSetDarkMode from "./hooks/useSetDarkMode"
import BlogDetails from "./Pages/BlogDetails"
import CreatePost from "./Pages/CreatePost"
import EditPost from "./Pages/EditPost"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import ManagePost from "./Pages/ManagePost/ManagePost"
import Profile from "./Pages/Profile"
import Register from "./Pages/Register"
import SendResetPassMail from "./Pages/SendResetPassMail"
import Header from "./Shared/Header/Header"
import RequireAuth from "./Shared/RequireAuth/RequireAuth"
import RequireMailVerify from "./Shared/RequireAuth/RequireMailVerify"

function App() {
	const { darkMode, handleDarkMode } = useSetDarkMode()
	return (
		<div className={`${darkMode && "dark "} `}>
			<div className="bg-gray-200 dark:bg-gray-800">
				<Header
					isDarkMode={darkMode}
					darkModeHandler={handleDarkMode}
				></Header>
				<Routes>
					<Route path={"/login"} element={<Login></Login>}></Route>
					<Route
						path={"/reset-password"}
						element={<SendResetPassMail />}
					></Route>
					<Route
						path={"/register"}
						element={<Register></Register>}
					></Route>
					<Route
						path={"/post/:postId"}
						element={<BlogDetails></BlogDetails>}
					></Route>
					<Route
						path="/post-edit/:postId"
						element={
							<RequireAuth>
								<RequireMailVerify>
									<EditPost></EditPost>
								</RequireMailVerify>
							</RequireAuth>
						}
					></Route>
					<Route
						path="/profile"
						element={
							<RequireAuth>
								<RequireMailVerify>
									<Profile></Profile>
								</RequireMailVerify>
							</RequireAuth>
						}
					></Route>
					<Route
						path="/managePosts"
						element={
							<RequireAuth>
								<RequireMailVerify>
									<ManagePost></ManagePost>
								</RequireMailVerify>
							</RequireAuth>
						}
					></Route>
					<Route
						path="/new-post"
						element={
							<RequireAuth>
								<RequireMailVerify>
									<CreatePost></CreatePost>
								</RequireMailVerify>
							</RequireAuth>
						}
					></Route>
					<Route path={"/"} element={<Home></Home>}></Route>
				</Routes>
				<Toaster></Toaster>
			</div>
		</div>
	)
}

export default App
