import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import {renderTextField, renderSelectAsync, renderSelectField} from '../utils/form-utils';
import { Field, FieldArray, reduxForm } from 'redux-form';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBlack, White} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: '#010144',
    alternateTextColor: White
  }
});

let Checkin = (props) => {
		const keyresults = props.my_keyresults;

	  const onSubmit = (data) => {
	    props.actions.checkin(data);
	  }

	  const { handleSubmit, pristine, reset, submitting } = props;
		return (
	    <MuiThemeProvider muiTheme={muiTheme}>
				<Grid fluid>
					<Row>
						<Col md={12}>
							<form onSubmit={handleSubmit(onSubmit)}>
                <RaisedButton label="Save" type="submit"/>
								<FieldArray name="keyresults" component={CheckinObjectivesFormItems} list={keyresults}/>
							</form>
						</Col>
					</Row>
				</Grid>
			</MuiThemeProvider>
		)
}

const CheckinObjectivesFormItems = (props) => {
	const keyresults = props.list;
	const { fields, meta: { touched, error, submitFailed } } = props;
	const style = {
	  message: {
	    position: "relative",
	    bottom: "2px",
	    fontSize: "12px",
	    lineHeight: '12px',
	    color: '#F3294D'
	  }
	}
	// keyresults.map ( (x) => { fields.push({kr: x}) });

  {(touched || submitFailed) && error && <span>{error}</span>}
	console.log(keyresults);
	return (
		<Row>
			<Col md={12}>
				{
					keyresults.map ( (x) => {
						console.log(x.keyresults.actual);
						return (
							<Row key={x.keyresults._id}>
								<Col md={12}>
									<span>{x.keyresults.quarter} - {x.keyresults.name}</span>
			            <Field name={x.keyresults._id} placeholder="Enter actual value" value={x.keyresults.actual} component={renderTextField}/>
									<span style={style.message}>Target: {x.keyresults.target}	{x.keyresults.units.value}</span>
									<br/><br/><br/>
								</Col>
							</Row>
						);
					})
				}
			</Col>
		</Row>
	)
}

// Decorate the form component
Checkin = reduxForm({
  form: 'checkin'
})(Checkin);

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => ({})

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (Checkin);
