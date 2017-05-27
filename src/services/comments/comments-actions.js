
export function getCommentsForObjectiveCompleted (data) {
	return  {
		type: "GET_COMMENTS_FOR_OBJECTIVE",
		payload: data
	}
}

export function getCommentsForObjective (data) {
	console.log(data);
	return (dispatch) => {
		return fetch('http://localhost:3001/api/comments?refid='+data, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getCommentsForObjectiveCompleted(data)))
	}
}
