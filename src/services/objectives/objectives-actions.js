import {reset} from 'redux-form';

export function getObjectivesCompleted (data) {
	return  {
		type: "GET_OBJECTIVES",
		payload: data
	}
}

export function saveObjectiveCompleted (data) {
	return  {
		type: "SAVE_OBJECTIVE_RETURNED",
		payload: data
	}
}

export function saveKeyResultsCompleted (data) {
	return  {
		type: "SAVE_KEY_RESULT_RETURNED",
		payload: data
	}
}

export function saveNewObjective(data) {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: data.objective})
		})
		.then((res) => res.json())
		.then((data) => dispatch(saveObjectiveCompleted(data)))
	}
}

export function saveNewKeyResult(objectiveId, data) {
	console.log(objectiveId, data);
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives/'+objectiveId+'/keyresults', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: data})
		})
		.then(() => dispatch(reset('keyresultform')))
		.then(() => dispatch(saveKeyResultsCompleted(data)))
	}
}

export function getObjectives () {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives', {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getObjectivesCompleted(data)))
	}
}
