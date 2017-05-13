import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import * as empActions from '../../services/employees/employees-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import AutoCompleteAsync from '../utils/autocomplete-async';

const validate = values => {
  const errors = {}
  const requiredFields = [ 'keyresult', 'owner' ]
  requiredFields.forEach(field => {
    console.log('Values: ', values);
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  console.log('owner value: ', values.owner);

  if (values.target && !/^\d+$/i.test(values.target)) {
    errors.target = 'Please enter a numeric value.'
  }
  return errors
}
//
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
)

// value={{val: props.value}}
// onChange={param => props.onChange(param.val)}

const logChange = () => {
  console.log('field value');
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
            <Field name="owner"
                component={AutoCompleteAsync}
                placeholder="Owner"
                resultsValueKey="_id"
                resultsLabelKey="name"
                callback={props.empActions.findEmployeesByName}
                callbackUrl="http://localhost:3001/employees/find/"
                results={props.employee_results}
            />  
          </Col>
          <Col md={4}>
            <Field name="tags"
                component={AutoCompleteAsync}
                placeholder="Tags"
                multi = {true}
                resultsValueKey="_id"
                resultsLabelKey="name"
                callback={props.empActions.findEmployeesByName}
                callbackUrl="http://localhost:3001/employees/find/"
                results={props.employee_results}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
              <Field name="target" component={renderTextField} label="Target"/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Field name="units"
                component={AutoCompleteAsync}
                placeholder="Units"
                resultsValueKey="_id"
                resultsLabelKey="name"
                callback={props.empActions.findEmployeesByName}
                callbackUrl="http://localhost:3001/employees/find/"
                results={props.employee_results}
            />
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
  empActions: bindActionCreators(empActions, dispatch),  
});

export default connect (mapStateToProps, mapDispatchToProps) (KeyResultForm);
