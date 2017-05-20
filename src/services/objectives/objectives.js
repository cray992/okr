const initialState = {
  checkin_open_flag: false, 
  checkin_submitted_flag: false,
  checkin_close_flag: true
};

export default ( state = initialState, { type, payload } ) => {
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
    case "GET_OBJ_PROGRESS_COMPLETED":
      return {...state, objective_progress_results: payload};
    case "CHECKIN_DIALOG_OPEN_REQUESTED":
      return {...state, checkin_open_flag: true, checkin_close_flag: false, checkin_submitted_flag: false};
    case "CHECKIN_DIALOG_CANCEL_REQUESTED":
      return {...state, checkin_close_flag: true, checkin_open_flag: false, checkin_submitted_flag: false};
    case "CHECKIN_SUBMIT_REQUESTED":
      return {...state, checkin_submitted_flag: true, checkin_close_flag: false, checkin_open_flag: true};
    case "CHECKIN_SUBMIT_COMPLETED":
    console.log('CHECKIN_SUBMIT_COMPLETED invoked');
      return {...state, checkin_submitted_flag: false, checkin_close_flag: true, checkin_open_flag: false};
  	default: 
  		return state;
  }
};
