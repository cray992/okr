import React from 'react';
import ObjectiveProgressChart from './objective-progress-chart';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Dashboard = (props) => {
	return(
		<div>
			<br/>
			<Grid fluid>
				<Row>
					<Col md={6}>
						<ObjectiveProgressChart />
					</Col>
					<Col md={6}>
						<ObjectiveProgressChart />
					</Col>
				</Row>
			</Grid>
		</div>
	);  
}

export default Dashboard;