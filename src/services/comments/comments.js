export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "GET_COMMENTS_FOR_OBJECTIVE":
      return {objective_comments: payload};
    case "SAVE_NEW_COMMENT_COMPLETED":
      return {...state, objective_comments: [...state.objective_comments, payload] };
    default: 
      return state;
  }
};

const initialState = {}