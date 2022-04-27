import React from "react"
import Helmet from "react-helmet"

const HelmetTitle = ({children = ""}) => {

	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{children} - BlogBank</title>
			<link rel="canonical" href="http://mysite.com/example" />
		</Helmet>
	)
}

export default HelmetTitle
