import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50, White, darkBlack} from 'material-ui/styles/colors';
import Checkin from './checkin';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: '#F3294D',
    alternateTextColor: darkBlack
  }
});

class CheckinHome extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

	constructor (props) {
		super (props);
		this.eid = props.eid || '5912036687a30c1a28d99142';
		this.props.actions.fetchCurrentEmployeeKeyResults(this.eid)
	}

	render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

		return(
	    <MuiThemeProvider muiTheme={muiTheme}>
	      <div>
	        <RaisedButton label="Checkin" onTouchTap={this.handleOpen} />
	        <Dialog
	          title="Checkin My Key Results"
	          actions={actions}
	          modal={false}
	          open={this.state.open}
	          onRequestClose={this.handleClose}
	          autoScrollBodyContent={true}
	        >
	        	<div>
		        	<br/>
							<Checkin my_keyresults={this.props.keyresults_fetch_results}/>
						</div>
	        </Dialog>
	      </div>
	    </MuiThemeProvider>
		)
	}
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
  	{keyresults_fetch_results: state.objectives.keyresults_fetch_results}
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (CheckinHome);