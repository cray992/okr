export function getObjectivesCompleted (data) {
	return  {
		type: "GET_OBJECTIVES",
		payload: data
	}
}

export function saveNewObjective(data) {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives', {
			method: "POST",
			body: data
		})
		// .then((res) => res.json())
		// .then((data) => getPortfolios())
	}
}

export function getObjectives () {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives', {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getPortfoliosCompleted(data)))
	}
}
