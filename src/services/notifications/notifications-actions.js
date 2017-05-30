
export function getMyNotificationsCompleted (data) {
	return  {
		type: "GET_MY_NOTIFICATIONS_COMPLETED",
		payload: data
	}
}

export function getMyNotifications (data) {
	console.log('Fetching my notifications: ', data);
	return (dispatch) => {
		return fetch('http://localhost:3001/api/notifications?eid='+data+'&token='+localStorage.getItem('userToken'), {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getMyNotificationsCompleted(data)))
	}
}
