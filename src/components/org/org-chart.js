import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

const orgData = [
    { "name": "Ravi Botla", "email": "rbotla@changehealthcare.com", "manager": "bennie.jones@McKesson.com" },
    { "name": "Dean Quach", "email": "dquach@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Holt Zeidler", "email": "HZeidler@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Keith Weinheimer", "email": "kweinheimer@changehealthcare.com", "manager": "bennie.jones@McKesson.com" },
    { "name": "Angela Hacksel-Newmark", "email": "AHACKSELNEWMARK@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Holly Hon", "email": "hhon@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Brian North", "email": "brian.north@changehealthcare.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "Bennie Jones", "email": "bennie.jones@McKesson.com", "manager": "jguillebeaux@changehealthcare.com" },
    { "name": "John Guillebeaux", "email": "jguillebeaux@changehealthcare.com", "manager": "achoy@changehealthcare.com" },
    { "name": "Alex Choy", "email": "achoy@changehealthcare.com", "manager": "NdeCrescenzo@changehealthcare.com" },
    { "name": "Neil De Crescenzo", "email": "NdeCrescenzo@changehealthcare.com" }
];

const styles = {
	avatar: {
		margin: 5
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
					<OrgChartMain data={orgData}/>
				</Col>
			</Row>
		</Grid>
	);	
}

const OrgChartMain = (props) => (
	<Row>
		{
			props.data.map( (record) => (
			<Col md={3}>
				<OrgChartCard rec={record}/>
			</Col>
			))
		}
	</Row>
)

const OrgChartCard = (props) => {
	const {name, email, manager} = props.rec;
	//{name, email, title, eno, location, company, department, glstring, wphone, temps, tmgrs} = this.props.data;
console.log(name);
	return (
	 	<MuiThemeProvider muiTheme={getMuiTheme()}>
		  <Card>
		    <CardHeader
		      title={name}
		      subtitle="SVP, ETPM"
		      avatar="/person-avatar.png"
		    />
		    <CardText>
		    	Email: {email}
		    	<br/>
		    	Manager: {manager}
		    </CardText>
		    <CardActions>
		      <FlatButton label="View My Org" />
		    </CardActions>
		  </Card>
	  </MuiThemeProvider>
	);

}

export default OrgChart;
