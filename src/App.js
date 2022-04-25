import { useEffect, useState } from "react"
import "./App.css"
import useSetDarkMode from "./hooks/useSetDarkMode"

function App() {
  const {isDarkMode, handleDarkMode} = useSetDarkMode()
	return (
		<div className={`${isDarkMode && "dark"}`}>
      <button onClick={handleDarkMode}>toogle dark and white mode</button>
			<h1 className="text-red-800 dark:text-green-800">hello world!</h1>
		</div>
	)
}

export default App
