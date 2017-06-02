import React from 'react';
import ObjectiveProgressChart from './objective-progress-chart';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './_charts.css';

	const progressData = [
    {name: 'Q1', actual: 14, target: 23, projected: 14},
    {name: 'Q2', actual: 31, target: 45, projected: 38},
    {name: 'Q3', target: 72, projected: 60},
    {name: 'Q4', target: 100, projected: 95}
	];

const Dashboard = (props) => {
	return(
		<div>
			<br/>
			<Grid fluid>
				<Row>
					<Col md={12}>
						<div className="sectionHeader">My Org Progress</div>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<ObjectiveProgressChart data={progressData}/>
					</Col>
					<Col md={4}>
						
					</Col>
					<Col md={4}>
						
					</Col>
				</Row>
			</Grid>
		</div>
	);  
}

export default Dashboard;