import { combineReducers } from 'redux';
import objectives from './objectives/objectives';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ objectives, routing: routerReducer, form: formReducer });