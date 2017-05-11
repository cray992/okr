import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import AutoCompleteAsync from '../utils/autocomplete-async';

const validate = values => {
  const errors = {}
  const requiredFields = [ 'keyresult' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  if (values.target && !/^\d+$/i.test(values.target)) {
    errors.target = 'Please enter a numeric value.'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
)

var getOwnerOptions = function(input) {
  setTimeout(function() {
    this.props.actions.saveNewObjective(input.value)
  }, 500);
};

var getTagOptions = function(input, callback) {
  setTimeout(function() {
    callback(null, {
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ],
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: true
    });
  }, 500);
};

const unitOptions = [
    { value: 'empty', label: 'None' },
    { value: 'Dollars', label: 'Dollars' },
    { value: 'Percentage', label: 'Percentage' },
    { value: 'Leads', label: 'Leads' }    
];

const renderSelectAsync = ({loadOptions}) => (
  <Select.Async 
    value={this.state.value} // objective owner from redux
    onChange={this.onChange} 
    onValueClick={this.gotoUser} 
    valueKey="id" 
    labelKey="login" 
    loadOptions={this.getUsers} 
    backspaceRemoves={this.state.backspaceRemoves} />
);

const renderSelect = ({input, options, onInputChange, loadOptions}) => (
    <Select
      {...input}
      value={input.values}
      {...options}
      {...loadOptions}
      multi={true}
      {...onInputChange}
      onChange={(value) => {
          console.log(input);
          console.log(value);
        }
      }
      onBlur={() => {
        input.onBlur([...input.value]);
      }
    }
    />
);

const handleChange = (value) => {
  console.log(value);
}

let KeyResultForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
	return(
    <Grid>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
              <Field name="keyresult" component={renderTextField} label="Key Result"/>
          </Col>
          <Col md={4}>
              <RaisedButton label="Save" disabled={submitting} type="submit"/>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <AutoCompleteAsync label='Owner'/>
          </Col>
          <Col md={4}>
            <Field name="tags" component={renderSelect} label="Tags" loadOptions={getTagOptions}/>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
              <Field name="target" component={renderTextField} label="Target"/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Field name="units" component={renderSelect} options={unitOptions} label="Units"/>
          </Col>
        </Row>
      </form>
    </Grid>
  );
}

// Decorate the form component
KeyResultForm = reduxForm({
  form: 'keyresultform',
  validate
})(KeyResultForm);


// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      employee_results: state.employees.employee_results
    }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (KeyResultForm);
