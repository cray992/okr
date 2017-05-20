export function getObjectivesCompleted (data) {
	return  {
		type: "GET_OBJECTIVES_COMPLETED",
		payload: data
	}
}

//http://localhost:8080/rest/api/latest/issue/ITSM-10
export function getJiraProjects () {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives', {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getObjectivesCompleted(data)))
	}
}
