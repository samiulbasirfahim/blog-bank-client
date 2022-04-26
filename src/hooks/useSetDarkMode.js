import { async } from "@firebase/util"
import { useEffect, useState } from "react"

const useSetDarkMode = () => {
	const [isDarkModeOn, setIsDarkModeOn] = useState()
	const [darkMode, setDarkMode] = useState(null)
	useEffect(() => {
		const loadData = async () => {
			const darkModeOn = await localStorage.getItem("isDarkMode")
			setIsDarkModeOn(darkModeOn)
		}
		loadData()
	}, [])
	useEffect(() => {
		if (isDarkModeOn === "true") {
			setDarkMode(true)
		} else {
			setDarkMode(false)

		}
	}, [isDarkModeOn])
	const handleDarkMode = () => {
		setDarkMode(!darkMode)
		localStorage.setItem("isDarkMode", !darkMode)
	}

	return { darkMode, handleDarkMode }
}

export default useSetDarkMode
