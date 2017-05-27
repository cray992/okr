export default ( state = initialState, { type, payload } ) => {
  switch (type) {
    case "GET_MY_NOTIFICATIONS_COMPLETED":
      return {my_notifications: payload};
    default: 
      return state;
  }
};

const initialState = {}