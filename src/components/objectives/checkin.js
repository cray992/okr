import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import {renderTextField, renderSelectAsync, renderSelectField} from '../utils/form-utils';
import { Field, FieldArray, reduxForm } from 'redux-form';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBlack, White} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: 'Black',
    alternateTextColor: darkBlack
  }
});

let Checkin = (props) => {
		const keyresults = props.my_keyresults;
		console.log(keyresults);
		return (
	    <MuiThemeProvider muiTheme={muiTheme}>
				<Grid fluid>
				{
					(keyresults ? 
						(keyresults.map ( (x) => {
							return (
								<Row>
									<Col md={12}>
										<CheckinObjectivesFormItem key={x.keyresults._id} keyresult={x}/>
									</Col>
								</Row>
							);
						}))
						:
						( <div>No key results found for you.</div> )
					)
				}
			</Grid>
		</MuiThemeProvider>
	)
}


const CheckinObjectivesFormItem = (props) => {
	const x = props.keyresult;
	return (
    <form>
			<Row>
				<Col md={12}>
					<Row>
						<Col md={8}>
							{x.keyresults.quarter} - {x.keyresults.name}	
						</Col>
						<Col md={4}>
	            <Field name="actual" component={renderTextField}/>
	            <br/>
							Target: {x.keyresults.target}	{x.keyresults.units.value}
						</Col>
					</Row>
				</Col>
			</Row>
		</form>
	)
}

// Decorate the form component
Checkin = reduxForm({
  form: 'checkin'
})(Checkin);

export default Checkin;