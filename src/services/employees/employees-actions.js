import customAxios from '../../custom-axios';

export function getEmployeesCompleted (data) {
	return  {
		type: "GET_EMPLOYEES_BY_NAME_COMPLETED",
		payload: data
	}
}

export function getEmployeeProfileCompleted (data) {
	return  {
		type: "GET_EMPLOYEE_PROFILE_COMPLETED",
		payload: data
	}
}

export function findEmployeesByName(data) {
	return (dispatch) => {
		return customAxios('employees/filter?name='+data, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getEmployeesCompleted(data)))
	}
}

export function getEmpProfile(empId) {
	return (dispatch) => {
		return customAxios('/employees/findById?eid='+empId, {
			method: "GET"
		})
		.then((res) => res.data)
		.then((data) => dispatch(getEmployeeProfileCompleted(data)))
	}
}