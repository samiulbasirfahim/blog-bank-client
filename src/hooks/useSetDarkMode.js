import { useEffect, useState } from "react"

const useSetDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)
	useEffect(() => {
		const isdarkModeOn = localStorage.getItem("isDarkMode")
		if (isdarkModeOn) {
			setIsDarkMode(true)
		} else {
			setIsDarkMode(false)
		}
	}, [])
	const handleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
		localStorage.setItem("isDarkMode", true)
	}

    return {isDarkMode, handleDarkMode}
}

export default useSetDarkMode
