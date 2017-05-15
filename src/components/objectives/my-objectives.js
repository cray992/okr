import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LinearProgress from 'material-ui/LinearProgress';
import MyObjectivesHeader from './my-objectives-header';
import MyObjectivesList from './my-objectives-list';

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

const MyObjectives = props => {
	const progress =65;
	const myObjectives = [
		{objective: "Revenue recognition Architecture & Design", progress: 72},
		{objective: "Print & Payment Platform Design", progress: 63},
		{objective: "Single Billing Platform API Architecture", progress: 20},
		{objective: "New time tracking approach", progress: 52},
		{objective: "Remedyforce JIRA integration", progress: 80},
		{objective: "New protfolio management application", progress: 10},
		{objective: "One customer portal", progress: 0}		
	]; 
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
							<span style={styles.progress}> {progress}% </span>
			      	<MuiThemeProvider muiTheme={getMuiTheme()}>
      					<LinearProgress mode="determinate" color="#F3294D" value={progress} />
							</MuiThemeProvider>
						</Col>
					</Row>
					<Row>
						<Col md={2}/>
						<Col md={7}>
							<br/>
							<MyObjectivesList objectives={myObjectives}/>
						</Col>
					</Row>
				</Grid>
			</div>
		</div>
	);
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 

    }
  )
}

export const mapDispatchToProps = (dispatch) => ({

});

export default connect (mapStateToProps, mapDispatchToProps) (MyObjectives);



