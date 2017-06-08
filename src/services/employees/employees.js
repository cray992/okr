const currentEmpId = localStorage.getItem('empId');

export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "GET_EMPLOYEES_BY_NAME_COMPLETED":
      return {...state, employee_results: payload};
    case "GET_EMPLOYEE_PROFILE_COMPLETED":
    	return {...state, current_emp_obj: payload}
  	default: 
  		return state;
  }
};

const initialState = {
  current_emp_id: currentEmpId
}