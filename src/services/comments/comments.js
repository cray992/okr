export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "GET_COMMENTS_FOR_OBJECTIVE":
      return {objective_comments: payload};
    default: 
      return state;
  }
};

const initialState = {}