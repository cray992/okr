const initialObjectives =
[
	{id: "1234", name: "IT Portfolio", trades: [{id: "1234", name: "Oracle", code: 'ORCL', }, {id: "1235", name: "Facebook", code: "FB", } ] }, 
	{id: "1235", name: "Healthcare portfolio", trades: [{id: "1236", name: "UnitedHealth Group", code: "UHG", }, {id: "1237", name: "Medtronic", }, {id: "1238", name: "McKesson", }, ] }, 
];

export default ( state = initialObjectives, { type, payload } ) => {
  switch (type) {
    case "SAVE_OBJECTIVE_RETURNED":
      return {currentObjective: payload};
  	case "GET_OBJECTIVES":
  		return [...payload];
  	case "SAVE_NEW_OBJECTIVE":
  		return [...payload];
    case "SAVE_NEW_KEY_RESULT":
      return [...payload];
  	default: 
  		return state;
  }
};