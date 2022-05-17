import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import auth from "../firebase.init"
import useLoadNotifications from "../hooks/useLoadNotification"

const Notification = () => {
	const [notifications, setNotifications] = useLoadNotifications()
	const navigate = useNavigate()
	const handleDeleteNotification = (id) => {
		fetch("https://blog-post-fahim.herokuapp.com/notification/" + id, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				const remaining = notifications.filter(
					(notification) => notification._id !== id
				)
				setNotifications(remaining)
				console.log(remaining)
			})
	}
	return (
		<div className="min-h-screen pt-[2vh]">
			<div className=" grid justify-items-center items-start">
				{notifications &&
					notifications.map((notification) => {
						return (
							<div
								id="alert-additional-content-1"
								class="p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200  lg:w-[576px] w-full"
								role="alert"
							>
								<div class="flex items-center">
									<svg
										class="mr-2 w-5 h-5 text-blue-700 dark:text-blue-800"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clip-rule="evenodd"
										></path>
									</svg>
									<h3 class="text-lg font-medium text-blue-700 dark:text-blue-800">
										{notification.title}
									</h3>
								</div>
								<div class="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
									{notification.detail}
								</div>
								<div class="flex">
									<button
										type="button"
										class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-800 dark:hover:bg-blue-900"
										onClick={() =>
											navigate(
												"/post/" + notification.postId
											)
										}
									>
										<svg
											class="-ml-0.5 mr-2 h-4 w-4"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
											<path
												fill-rule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										View more
									</button>
									<button
										type="button"
										class="text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-blue-800 dark:text-blue-800 dark:hover:text-white"
										data-dismiss-target="#alert-additional-content-1"
										aria-label="Close"
										onClick={() =>
											handleDeleteNotification(
												notification._id
											)
										}
									>
										Delete
									</button>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default Notification
