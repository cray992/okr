import { combineReducers } from 'redux';
import objectives from './objectives/objectives';
import employees from './employees/employees';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ objectives, employees, routing: routerReducer, form: formReducer });