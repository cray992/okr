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
import CommentsContainer from '../comments/comments-container';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Objectiveslist from './objectives-list';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: "#F3294D",
    alternateTextColor: Colors.darkBlack
  }
});

const muiThemeTab = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#FFF",
    primary2Color: "#F3294D",
    accent1Color: "#F3294D",
    pickerHeaderColor: "#F3294D",
    alternateTextColor: Colors.darkBlack
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
	},
  chip: {
    margin: 4,
  }
}

const style = {
	objview: {
		height: '30px'
	} 
}

class ViewObjective extends Component {
	constructor (props) {
		super(props);
		props.actions.getObjectiveDetails(props.params.id);
		props.actions.getChildObjectives(props.params.id);
    this.state = { tabValue: 'kr', };
		this.handleTabChange = this.handleTabChange.bind(this);
	}
  
  handleTabChange (value) {
    this.setState({
      tabValue: value,
    });
  };

	render () {
		const objective = this.props.currentObjective;
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
								<Col md={3} style={{borderRightStyle:"dotted", borderRightWidth:'thin', borderRightColor: '#9BA1A9'}}>
									<Row>
										<Col md={12}>
					            <MuiThemeProvider muiTheme={muiTheme} >
												<ObjectiveDetailsView objective={objective}/>
											</MuiThemeProvider>
										</Col>
									</Row>
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
					            <MuiThemeProvider muiTheme={muiThemeTab} >
										    <Tabs
										      value={this.state.tabValue}
										      onChange={this.handleTabChange}
										    >
										      <Tab label="Key Results" value="kr">
														<KeyResultsList keyresults={objective.keyresults}/>
										      </Tab>
										      <Tab label="Child Objectives" value="co">
														<Objectiveslist objectives={this.props.current_child_objectives}/>
										      </Tab>
										    </Tabs>
					            </MuiThemeProvider>
										</Col>
									<Col md={3}></Col>
									</Row>
								</Col>
								
								<Col md={3} style={{borderLeftStyle:"dotted", borderLeftWidth:'thin', borderLeftColor: '#9BA1A9'}}>
									<Row>
										<Col md={12}>
											<br/>
					            <MuiThemeProvider muiTheme={muiTheme} >
					            	<CommentsContainer objective={objective}/>
											</MuiThemeProvider>
										</Col>
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
		<Row >
			<Col md={6}>
        <Chip style={styles.chip}>
          <Avatar src="/person-avatar.png" />
          {props.objective.owner.name}
        </Chip>
      </Col>
			<Col md={6}>
        <Chip style={styles.chip}> {props.objective.category} </Chip>
      </Col>
		</Row>
		<Row >
			<Col md={12}><br/>{props.objective.description}</Col>
		</Row>
		<br/>
		<Divider />
	</div>
)

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
      currentObjective: state.objectives.currentObjective,
      current_child_objectives: state.objectives.current_child_objectives
    }
  )
}

export const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect (mapStateToProps, mapDispatchToProps) (ViewObjective);
