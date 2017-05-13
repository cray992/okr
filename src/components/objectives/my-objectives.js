import React from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	profiletop: {
		background: "#010144",
		color: "white",
	},
	profilepic: {
		position: 'absolute',
    top: '80px',
    left: '90px',
    width: '200px',
    height: '100px'
	},
	profilecontainer: {
		background: "#010144"
	},
	avatar: {
		margin: 5
	}
};

const MyObjectives = props => {
	return(
		<div style={styles.profilecontainer}>
		<Grid fluid>
			<Row>
				<Col xs={12}>
					<div style={styles.profiletop}>
						<Row>
							<Col md={2}>
							</Col>
							<Col md={10}>
								<div className="profile-name">
									<h4>Ravi Botla</h4>
								</div>
							</Col>
						</Row>
						<Row>
							<Col md={2}></Col>
							<Col md={6}>
								<div className="profile-title">
									Director, Product Development &nbsp;&nbsp;|&nbsp;&nbsp;ETPM
								</div>
							</Col>
							<Col md={4}>
								<div className="view-org-link">
			      			<MuiThemeProvider muiTheme={getMuiTheme()}>
    								<FlatButton label="View Org" primary={true} />
									</ MuiThemeProvider>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<div style={styles.profilepic}>
			      <MuiThemeProvider muiTheme={getMuiTheme()}>
			        <Avatar
			          src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/042/06f/026affe.jpg"
			          size={120}
			          style={styles.avatar}
			        />
			      </MuiThemeProvider>
					</div>
				</Col>
			</Row>
		</Grid>
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



