import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import * as actions from '../../services/objectives/objectives-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PageHeader from './page-header';
import KeyResultsList from './key-results-list';
import CircularProgress from 'material-ui/CircularProgress';
import ObjectiveHierarchy from './objective-hierarchy';
import Divider from 'material-ui/Divider';

const muiTheme = getMuiTheme({
  palette: {
    textColor: "#F3294D",
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: "#F3294D",
    alternateTextColor: "#F3294D"
  }
});

const styles = {
	progresstext: {
		position: 'relative',
		top: '-75px',
		left: '10px',
		fontSize: "30px",
    display: "block",
    marginTop: "-.25em"
	},
	center: {
		textAlign: 'center'
	}
}

const currentObjective = {
	name: 'Revenue recognition',
	keyresults: [
		{name: 'RMS solution by end of September 2017'},
		{name: 'Design CLM to upload contracts by end of July 2017'},
		{name: 'Design Revenue datamart by end of Aug 2017'}		
	]
};

const style = {
	objview: {
		height: '30px'
	} 
}

class ViewObjective extends Component {
	constructor (props) {
		super(props);
		props.actions.getObjectiveDetails(props.params.id);
	}

	render () {
		const objective = this.props.currentObjective;
		console.log(objective);

		return (
			<div>
			{
				objective ? 
					<div>
						<PageHeader 
							title={"Objective: " + this.props.currentObjective.name}
						/>
						<Grid fluid>
							<Row>
								<Col md={3}>
									<Row style={styles.center}>
										<Col md={12} >
											<br/>
					            <MuiThemeProvider muiTheme={muiTheme} >
					            	<div>
													<CircularProgress mode="determinate" size={120} thickness={8} value={80}/>
									        <span style={styles.progresstext}>{80}%</span>
													<Divider />
								        </div>
											</MuiThemeProvider>
										</Col>
									</Row>
									<Row style={styles.center}>
										<Col md={12} >
											<br/>
					            <MuiThemeProvider muiTheme={muiTheme} >
												<ObjectiveHierarchy />
											</MuiThemeProvider>
										</Col>
									</Row>
								</Col>
								<Col md={6}>
									<Row>
										<Col md={12}>
											<ObjectiveDetailsView objective={objective}/>
										</Col>
									</Row>
									<Row>
										<Col md={12}>
											<KeyResultsList keyresults={objective.keyresults}/>
										</Col>
									<Col md={3}></Col>
									</Row>
								</Col>
							</Row>
						</Grid>
					</div>
				: null
			}
			</div>
		)
	}
}

const ObjectiveDetailsView = (props) => (
	<div>
		<br/>
		<Row style={style.objview}>
			<Col md={2}><b>Owner:</b></Col>
			<Col md={10}>{props.objective.owner.name}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Description:</b></Col>
			<Col md={10}>{props.objective.description}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Category:</b></Col>
			<Col md={10}>{props.objective.category}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Contingency:</b></Col>
			<Col md={10}>{props.objective.contingency}</Col>
		</Row>
		<Row style={style.objview}>
			<Col md={2}><b>Tags:</b></Col>
			<Col md={10}>{props.objective.tags.map(x => x.name).join(', ')}</Col>
		</Row>
	</div>
)

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      currentObjective: state.objectives.currentObjective
     }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (ViewObjective);
