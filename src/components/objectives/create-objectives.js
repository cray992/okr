import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import KeyResultsList from './key-results-list';
import KeyResultForm from './key-result-form';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

injectTapEventPlugin();

const style = {
		margin: "10px",
		padding: "10px",
		width: "100%",
	  textAlign: 'left',
	  display: 'inline-block',
};

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    accent1Color: "#F42A4D",
    pickerHeaderColor: "#8400D9",
    alternateTextColor: Colors.White
  },
}); 

const validate = values => {
  const errors = {}
  const requiredFields = [ 'objective' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors;
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
);

class CreateObjectives extends Component {
  onSubmit = (data) => {
    console.log('############## ', data);
    this.props.actions.saveNewObjective(data);
  }

  handleKeyResultsSubmit = ({keyresult}) => {
    console.log('>>>>>>>>>>>>>>>>>>> ', keyresult);
  }

	render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

		return(
      <MuiThemeProvider muiTheme={muiTheme}>
		    <div style={style} >
        <Grid>
            <form onSubmit={handleSubmit(this.onSubmit)}>
            <Row>
              <Col md={8}>
                <Field name="objective" component={renderTextField} label="Objective"/>
              </Col>

              <Col md={4}>
                <RaisedButton label="Save Objective" type="submit"/>
              </Col>
            </Row>
            </form>

            <Row>
              <Col md={12}>
                <KeyResultForm onSubmit={this.handleKeyResultsSubmit}/>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <KeyResultsList />
              </Col>
            </Row>
          </Grid>
				</div>
			</MuiThemeProvider>
    );
	}
}

// Decorate the form component
CreateObjectives = reduxForm({
  form: 'objective',
  validate
})(CreateObjectives);

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => ({ });

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (CreateObjectives);