import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LinearProgress from 'material-ui/LinearProgress';
import MyObjectivesHeader from './my-objectives-header';
import Objectiveslist from './objectives-list';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

const childContextTypes =
{
    muiTheme: React.PropTypes.object
}

const getChildContext = () =>
{
  return { muiTheme: getMuiTheme() } 
}

const styles = {
	progress: {
		fontSize: "24px",
    display: "block",
    marginTop: "-.25em"
	}
};

class MyObjectives extends Component {
	constructor (props) {
		super(props);
    //props.actions.getObjectivesProgressByEmp(props.params.id);
    props.actions.getMyObjectives(props.params.id)
	}

	render () {
		let empProgress = 0;
		if (this.props.my_objectives) {
			const size = this.props.my_objectives.length;
			empProgress = size == 0 ? 0 : this.props.my_objectives.map( x => x.progress ).reduce( (x1, x2) => x1 + x2, 0) / size;
			//empProgress = Math.Round(empProgress);
		}

		return(
			<div>
				<MyObjectivesHeader 
					name="Ravi Botla"
					title="Director, Product Development"
					group="ETPM"
					avatar="/profiles/ravi.jpg"
				/>

				<div style={styles.profilecontainer}>
					<Grid fluid>
						<Row>
							<Col md={2}/>
							<Col md={7}>
								<br/>
								<span style={styles.progress}> {Math.round(empProgress)}% </span>
				      	<MuiThemeProvider muiTheme={getMuiTheme()}>
	      					<LinearProgress mode="determinate" color="#F3294D" value={empProgress} />
								</MuiThemeProvider>
							</Col>
						</Row>
						<Row>
							<Col md={2}/>
							<Col md={7}>
								<br/>
								<Objectiveslist title="My Objectives" objectives={this.props.my_objectives}/>
							</Col>
						</Row>
					</Grid>
				</div>
			</div>
		);
	}
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
  	{my_objectives: state.objectives.my_objectives}
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (MyObjectives);
