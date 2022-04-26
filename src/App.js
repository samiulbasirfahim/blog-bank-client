import { Route, Routes } from "react-router-dom"
import useSetDarkMode from "./hooks/useSetDarkMode"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Header from "./Shared/Header/Header"
import RequireAuth from "./Shared/RequireAuth/RequireAuth"

function App() {
	const { darkMode, handleDarkMode } = useSetDarkMode()
	return (
		<div className={`${darkMode && "dark"}`}>
			<Header
				isDarkMode={darkMode}
				darkModeHandler={handleDarkMode}
			></Header>
			<Routes>
				<Route path={"/login"} element={<Login></Login>}></Route>
				<Route
					path={"/"}
					element={
						<RequireAuth>
							<Home></Home>
						</RequireAuth>
					}
				></Route>
			</Routes>
		</div>
	)
}

export default App
