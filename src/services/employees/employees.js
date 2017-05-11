export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "GET_EMPLOYEES_BY_NAME_COMPLETED":
      return {employee_results: payload};
  	default: 
  		return state;
  }
};

const initialState = {
  employee_results: [
    {
      value:"5912036687a30c1a28d99142",
      label:"Ravi Botla"
    }
  ]
}