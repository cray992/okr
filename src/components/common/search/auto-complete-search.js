import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import {renderSelectAsync} from '../../utils/form-utils';
import { Field, reduxForm } from 'redux-form';
// http://hackingbeauty.com/create-a-reactjs-component-part1/

const dataSource1 = [
  {
    text: 'text-value1',
    value: (
      <MenuItem
        primaryText="text-value1"
        secondaryText="&#9786;"
      />
    ),
  },
  {
    text: 'text-value2',
    value: (
      <MenuItem
        primaryText="text-value2"
        secondaryText="&#9786;"
      />
    ),
  },
];

const dataSource2 = ['12345', '23456', '34567'];

const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];
const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

const AutoCompleteSearch = () => (
  <div>
    <form>
    <div style={{ display: 'inline-block', maxWidth: '40px' }}>
      <Field name="parent"
        component={renderSelectAsync}
        placeholder="Seach OKRs"
        resultsValueKey="_id"
        resultsLabelKey="name"
        callbackUrl="http://localhost:3001/objectives/filter?name="
      />
      </div>
    </form>
  </div>
);

// Decorate the form component
AutoCompleteSearch = reduxForm({
  form: 'search'
})(AutoCompleteSearch);

export default AutoCompleteSearch;
