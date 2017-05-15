
export function getEmployeesCompleted (data) {
	return  {
		type: "GET_EMPLOYEES_BY_NAME_COMPLETED",
		payload: data
	}
}

export function findEmployeesByName(data) {
	return (dispatch) => {
		return fetch('http://localhost:3001/employees/filter?name='+data, {
			method: "GET"
		})
		.then((res) => res.json())
		.then((data) => dispatch(getEmployeesCompleted(data)))
	}
}
