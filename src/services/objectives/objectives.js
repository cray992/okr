const initialObjectives =
[
	{id: "1234", name: "IT Portfolio", trades: [{id: "1234", name: "Oracle", code: 'ORCL', }, {id: "1235", name: "Facebook", code: "FB", } ] }, 
	{id: "1235", name: "Healthcare portfolio", trades: [{id: "1236", name: "UnitedHealth Group", code: "UHG", }, {id: "1237", name: "Medtronic", }, {id: "1238", name: "McKesson", }, ] }, 
];

export default ( state = initialObjectives, { type, payload } ) => {
  switch (type) {
    case "SAVE_OBJECTIVE_RETURNED":
      return {currentObjective: payload};
    case "SAVE_KEY_RESULT_RETURNED":

      const newState = (
        state.currentKeyResults ?
          {...state, currentKeyResults: [...state.currentKeyResults, payload ] }
          : {...state, currentKeyResults: [ payload ] }
          ); 

      return newState;
    case "GET_OBJECTIVES_COMPLETED":
      return {objective_results: payload};
    case "GET_KEY_RESULTS_COMPLETED":
      return {...state, keyresults_fetch_results: payload};
  	default: 
  		return state;
  }
};
