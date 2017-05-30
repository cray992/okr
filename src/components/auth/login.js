import React, {Component} from 'react';
import axios from 'axios';
import {  browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBlack from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
  palette: {
    textColor: darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: darkBlack,
    alternateTextColor: darkBlack
  }
});

class Login extends Component {
	constructor (props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		axios({
			method: 'POST',
			url: 'http://localhost:3001/api/login',
			data: {
				username: this.state.username,
				password: this.state.password
			}
		})
		.then(response => {
			localStorage.setItem('userToken', response.data.token);
			// redirect to homepage
			browserHistory.push('/');
		})
		.catch(console.error);
	}

	handleUsernameChange(event) {
		this.setState({username: event.target.value})
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value})
	}

	render () {
		return (
		  <div className="login-page">
		    <form onSubmit={this.handleSubmit}>
          <MuiThemeProvider muiTheme={muiTheme} >
          	<div>
					    <TextField hintText="User Name" value={this.state.username} onChange={this.handleUsernameChange}/><br />
					    <br />
					    <TextField hintText="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/><br /> 
					    <RaisedButton type="submit" label="Login" primary={true} style={{marginTop: 12, width: '100%'}} />
					  </div> 
					</MuiThemeProvider>
		    </form>
		  </div>
		)
	}
}

export default Login;