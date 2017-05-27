import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import {renderSelectAsync} from '../../utils/form-utils';
import { Field, reduxForm } from 'redux-form';
// http://hackingbeauty.com/create-a-reactjs-component-part1/

const AutoCompleteSearch = () => (
  <form className="App-search">
    <Field name="parent"
      component={renderSelectAsync}
      placeholder="Seach OKRs"
      resultsValueKey="_id"
      resultsLabelKey="name"
      callbackUrl="http://localhost:3001/api/objectives/filter?name="
    />
  </form>
);

// Decorate the form component
AutoCompleteSearch = reduxForm({
  form: 'search'
})(AutoCompleteSearch);

export default AutoCompleteSearch;
