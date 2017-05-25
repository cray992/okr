import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const orgData = [
    { "name": "Ravi Botla", "title": "Director", "location": "San Mateo, CA", "email": "rbotla@changehealthcare.com", "manager": "bennie.jones@McKesson.com" },
    { "name": "Dean Quach", "title": "Sr. Director", "location": "Nashville, TN", "email": "dquach@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Holt Zeidler","title": "Director", "location": "Chicago, IL",  "email": "HZeidler@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Keith Weinheimer","title": "Director", "location": "Nashville, TN",  "email": "kweinheimer@changehealthcare.com", "manager": "bennie.jones@McKesson.com" },
    { "name": "Holly Hon", "title": "Sr. Director", "location": "San Mateo, CA", "email": "hhon@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Brian North", "title": "Sr. Director", "location": "Nashville, TN", "email": "brian.north@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Bennie Jones", "title": "VP", "location": "Boston, MA", "email": "bennie.jones@McKesson.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "John Guillebeaux", "title": "SVP", "location": "San Mateo, CA", "email": "jguillebeaux@changehealthcare.com", "manager": "achoy@changehealthcare.com" },
    { "name": "Alex Choy", "title": "EVP & CIO", "location": "San Mateo, CA", "email": "achoy@changehealthcare.com", "manager": "NdeCrescenzo@changehealthcare.com" },
    { "name": "Neil De Crescenzo", "title": "CEO", "location": "Nashville, TN", "email": "NdeCrescenzo@changehealthcare.com" }
];

const styles = {
	avatar: {
		margin: 5
	},
	details: {
		fontSize: "small"
	}
};

const OrgChart = (props) => {
	return (
		<Grid>
			<Row>
				<Col md={12}><br></br></Col>	
			</Row>
			<Row>
				<Col md={8}></Col>
				<Col md={4}><input type="text"/></Col>	
			</Row>
			<Row>
				<Col md={12}>
					<OrgChartMain employee={orgData[7]} manager={orgData[8]} org={orgData}/>
				</Col>
			</Row>
		</Grid>
	);	
}

const OrgChartMain = (props) => {
	const {manager, org, employee} = props;

	return (
		<Row>
			<Col md={12}>
				<Row>
						<Col md={4}></Col>
					{
						<Col md={4}>
							<OrgChartCard rec={manager}/>
						</Col>
					}
						<Col md={4}></Col>
				</Row>
				<BlankRow />
				<Row>
						<Col md={4}></Col>
					{
						<Col md={4}>
							<OrgChartCard rec={employee}/>
						</Col>
					}
						<Col md={4}></Col>
				</Row>

				<BlankRow />

				<Row>
					{
						props.org.map( (record, key) => {
							console.log(key);
							return (
								<Col md={3}>
									<OrgChartCard key={key} rec={record}/>
								</Col>
							)
						})
					}
				</Row>

				if (key%4 === 0) <BlankRow/>

			</Col>
		</Row>
	)

}

const BlankRow = () => {
	return (
		<Row>
			<Col md={12}>
				<div><br/></div>
			</Col>
		</Row>
	)
}

const OrgChartCard = (props) => {
	const {name, email, manager, title, location} = props.rec;
	//{name, email, title, eno, location, company, department, glstring, wphone, temps, tmgrs} = this.props.data;
	return (
	 	<MuiThemeProvider muiTheme={getMuiTheme()}>
		  <Card>
		    <CardHeader
		      title={name}
		      subtitle={title}
		      avatar="/person-avatar.png"
		      titleColor="#F3294D"
		    />
		    <CardText style={styles.details}>
		    	Email: {email}
		    	<br/>
		    	Work Phone: 
		    	<br/>
					Location: {location}
		    </CardText>
		    <CardActions>
            <IconButton tooltip="Click to expand" href="">
              <FontIcon className="material-icons">expand_less</FontIcon>
            </IconButton>

            <IconButton tooltip="Click to expand" href="">
              <FontIcon className="material-icons">expand_more</FontIcon>
            </IconButton>
		    </CardActions>
		  </Card>
	  </MuiThemeProvider>
	);

}

export default OrgChart;
