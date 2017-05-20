
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

export function getObjectivesProgressCompleted (data) {
	return  {
		type: "GET_OBJ_PROGRESS_COMPLETED",
		payload: data
	}
}

export function onCheckinCancelClicked () {
	return  {
		type: "CHECKIN_DIALOG_CANCEL_REQUESTED",
		payload: {}
	}
}

export function onCheckinSubmitClicked () {
	return  {
		type: "CHECKIN_SUBMIT_REQUESTED",
		payload: {}
	}
}

export function onCheckinSubmitCompleted () {
	return  {
		type: "CHECKIN_SUBMIT_COMPLETED",
		payload: {}
	}
}

export function checkinClicked() {
	return  {
		type: "CHECKIN_DIALOG_OPEN_REQUESTED",
		payload: {}
	}	
}

export function getObjectivesProgressByEmp(data) {
	return (dispatch) => {
		return fetch('http://localhost:3001/empobjprogress?eid='+data, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getObjectivesProgressCompleted(data)))
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
		dArr.push({id: k, actual: v});
	}
	const list = [...dArr];

	return (dispatch) => {
		return fetch('http://localhost:3001/keyresults/checkin', {
			method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	actual: list
      })
		})
		.then(() => fetchCurrentEmployeeObjectives('5912036687a30c1a28d99142'))
		.then(() => dispatch(onCheckinSubmitCompleted()))
		.catch(function(error) {
		  console.log('There has been a problem with your fetch operation: ' + error.message);
		});
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
