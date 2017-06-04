import customAxios from '../../custom-axios';

export function getEmployeesCompleted (data) {
	return  {
		type: "GET_EMPLOYEES_BY_NAME_COMPLETED",
		payload: data
	}
}

export function findEmployeesByName(data) {
	return (dispatch) => {
		return customAxios('http://localhost:3001/api/employees/filter?name='+data, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getEmployeesCompleted(data)))
	}
}
