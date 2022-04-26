import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import useSetDarkMode from "./hooks/useSetDarkMode"
import CreatePost from "./Pages/CreatePost"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import ManagePost from "./Pages/ManagePost/ManagePost"
import Register from "./Pages/Register"
import SendResetPassMail from "./Pages/SendResetPassMail"
import Header from "./Shared/Header/Header"
import RequireAuth from "./Shared/RequireAuth/RequireAuth"

function App() {
	const { darkMode, handleDarkMode } = useSetDarkMode()
	return (
		<div className={`${darkMode && "dark bg-gray-800"}`}>
			<Header
				isDarkMode={darkMode}
				darkModeHandler={handleDarkMode}
			></Header>
			<Routes>
				<Route path={"/login"} element={<Login></Login>}></Route>
				<Route path={"/reset-password"} element={<SendResetPassMail/>}></Route>
				<Route
					path={"/register"}
					element={<Register></Register>}
				></Route>
				<Route
					path="post"
					element={
						<RequireAuth>
							<CreatePost></CreatePost>
						</RequireAuth>
					}
				></Route>
				<Route
					path="/managePosts"
					element={
						<RequireAuth>
							<ManagePost></ManagePost>
						</RequireAuth>
					}
				></Route>
				<Route
					path="/new-post"
					element={
						<RequireAuth>
							<CreatePost />
						</RequireAuth>
					}
				></Route>
				<Route
					path={"/"}
					element={
						<RequireAuth>
							<Home></Home>
						</RequireAuth>
					}
				></Route>
			</Routes>
			<Toaster></Toaster>
		</div>
	)
}

export default App
