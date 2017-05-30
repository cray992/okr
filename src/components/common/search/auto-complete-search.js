import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import {renderSelectAsync} from '../../utils/form-utils';
import { Field, reduxForm } from 'redux-form';
// http://hackingbeauty.com/create-a-reactjs-component-part1/
import { browserHistory } from 'react-router';

const AutoCompleteSearch = (props) => {
  return (
    <form className="App-search">
      <Field name="parent"
        component={renderSelectAsync}
        placeholder="Seach OKRs" 
        resultsValueKey="_id"
        resultsLabelKey="name"
        onChange={(x) => { browserHistory.push(`/objectives/${x._id}`) }}
        callbackUrl="http://localhost:3001/api/objectives/filter?name="
      />
    </form>
  )


}

// browserHistory.push(`/objectives/${x._id}`);

// Decorate the form component
AutoCompleteSearch = reduxForm({
  form: 'search'
})(AutoCompleteSearch);

export default AutoCompleteSearch;
