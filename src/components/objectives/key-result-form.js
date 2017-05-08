import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
  const errors = {}
  const requiredFields = [ 'keyresult' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
)

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
              <RaisedButton label="Save Key Result" disabled={submitting} type="submit"/>
          </Col>
        </Row>
      </form>
    </Grid>
  );
}

// Decorate the form component
KeyResultForm = reduxForm({
  form: 'keyresult',
  validate
})(KeyResultForm);

export default KeyResultForm;
