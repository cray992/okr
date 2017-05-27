import React, {Component} from 'react';
import axios from 'axios';
import {  browserHistory } from 'react-router';

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
		    	<input value={this.state.username} onChange={this.handleUsernameChange}/>
		    	<br />
		    	<input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
		    	<br />
		    	<button type="submit">Submit</button>
		    </form>
		  </div>
		)
	}
}

export default Login;