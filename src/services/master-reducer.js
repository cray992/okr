import { combineReducers } from 'redux';
import objectives from './objectives/objectives';
import employees from './employees/employees';
import comments from './comments/comments';
import notifications from './notifications/notifications';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ objectives, employees, comments, notifications, routing: routerReducer, form: formReducer });