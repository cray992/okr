
import {reset} from 'redux-form';

export function getObjectivesCompleted (data) {
	return  {
		type: "GET_OBJECTIVES_COMPLETED",
		payload: data
	}
}

export function saveObjectiveCompleted (data) {
	return  {
		type: "SAVE_OBJECTIVE_RETURNED",
		payload: data
	}
}

export function getKeyresultsCompleted (data) {
	return  {
		type: "GET_KEY_RESULTS_COMPLETED",
		payload: data
	}
}

export function findObjectivesByName(data) {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives/filter?name='+data, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getObjectivesCompleted(data)))
	}
}

export function fetchCurrentEmployeeObjectives(eid) {
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives/filter?eid='+eid, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getObjectivesCompleted(data)))
	}
}

export function fetchCurrentEmployeeKeyResults(eid) {
	return (dispatch) => {
		return fetch('http://localhost:3001/keyresults/filter?eid='+eid, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getKeyresultsCompleted(data)))
	}
}

export function saveKeyResultsCompleted (data) {
	return  {
		type: "SAVE_KEY_RESULT_RETURNED",
		payload: data
	}
}

export function checkin(data) {
	let dArr = [];
	for (let [k, v] of Object.entries(data)) {
		dArr.push({'id': k, 'actual': v});
	}
	return (dispatch) => {
		return fetch('http://localhost:3001/keyresults/checkin', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'actual': dArr})
		})
	}
}

export function saveNewObjective(data) {
	let tags = [];
	let pobjective = {};
	const description = data.description || '';
	if (data.tags) {
		tags = data.tags.map((x) => ({tid: '123', name: x.value}));
	}
	if (data.parent) {
		pobjective = {oid: data.parent._id};
	}
	return (dispatch) => {
		return fetch('http://localhost:3001/objectives', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	name: data.objective,
      	description: description,
      	pobjective: pobjective,
			  owner: {eid: data.owner._id, name: data.owner.name},
			  category: data.category,
			  contingency: data.contingency,
			  tags: tags
      })
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
      body: JSON.stringify({
      	name: data.keyresult,
      	owner: {eid: data.owner._id, name: data.owner.name},
      	quarter: data.quarter,
      	target: data.target,
      	actual: 0,
      	units: {uid: data.units._id, value: data.units.value}
      })
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
