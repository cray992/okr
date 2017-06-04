
import customAxios from '../../custom-axios';

export function getMyNotificationsCompleted (data) {
	return  {
		type: "GET_MY_NOTIFICATIONS_COMPLETED",
		payload: data
	}
}

export function getMyNotifications (data) {
	console.log('Fetching my notifications: ', data);
	return (dispatch) => {
		console.log(customAxios.defaults.headers)
		return customAxios({
			url: 'notifications?eid='+data,
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getMyNotificationsCompleted(data)))
	}
}
