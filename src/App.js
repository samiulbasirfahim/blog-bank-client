import { Route, Routes } from "react-router-dom"
import useSetDarkMode from "./hooks/useSetDarkMode"
import Home from "./Pages/Home"
import Header from "./Shared/Header/Header"

function App() {
	const { isDarkMode, handleDarkMode } = useSetDarkMode()
	return (
		<div className={`${isDarkMode && "dark"}`}>
			<Header
				isDarkMode={isDarkMode}
				darkModeHandler={handleDarkMode}
			></Header>
			<Routes>
				<Route path={"/home"} element={<Home></Home>}></Route>
			</Routes>
		</div>
	)
}

export default App
