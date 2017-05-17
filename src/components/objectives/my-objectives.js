import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LinearProgress from 'material-ui/LinearProgress';
import MyObjectivesHeader from './my-objectives-header';
import MyObjectivesList from './my-objectives-list';
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
    props.actions.getObjectivesProgressByEmp('5912036687a30c1a28d99142');
    console.log(props.objective_progress_results);
	}

	render () {
		let objectives = [];
		let empProgress = 0;
		if (this.props.objective_progress_results) {
			objectives = this.props.objective_progress_results.map (x => ({_id: x._id, name: x.name, progress: Math.round(x.pcent * 100)}) ) 
			const sum = 0;
			objectives.forEach( x => {sum += x.progress});
			empProgress = Math.round(sum / objectives.length);
		}

		return(
			<div>
				<MyObjectivesHeader 
					name="Ravi Botla"
					title="Director, Product Development"
					group="ETPM"
					avatar="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/042/06f/026affe.jpg"
				/>

				<div style={styles.profilecontainer}>
					<Grid fluid>
						<Row>
							<Col md={2}/>
							<Col md={7}>
								<br/>
								<span style={styles.progress}> {empProgress}% </span>
				      	<MuiThemeProvider muiTheme={getMuiTheme()}>
	      					<LinearProgress mode="determinate" color="#F3294D" value={empProgress} />
								</MuiThemeProvider>
							</Col>
						</Row>
						<Row>
							<Col md={2}/>
							<Col md={7}>
								<br/>
								<MyObjectivesList objectives={objectives}/>
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
  	{objective_progress_results: state.objectives.objective_progress_results}
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (MyObjectives);
